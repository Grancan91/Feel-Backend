
const Record = require('../models/record_model');
const User = require('../models/user_model');

//Create new Record
const createUserRecord = async (req, res) => {
    try {
        //Create Record from req.body
        const record = await Record.create(req.body)
        
        //Save the reference to the user model
        
        //Load user model
        const user = await User.findById(res.locals.user.id); // res.locals.user from checkAuth
        //Insert Record.id in the user => records array.
        user.records.push(record.id)
        //Save document
        user.save()
        //Return a Record created
        return res.status(200).json(user.records);
    } catch (error) {
        if (error.name === 'ValidationError') {
            //If Emotions empty
            return res.status(400).send(error.message)
        } else {
            return res.status(500).json({ error: 'Error in createUserRecord' });
        }
    }
}

//Load all Records of Signed up User
const loadUserRecords = async (req, res) => {
    try {
      
        //Load Signed up user.ç
        console.log(res.locals.user.id)
        const user = await User.findById(res.locals.user.id) // res.locals.user from checkAuth
        console.log(user)

        //Records of user
        const recordsId = user.records
        console.log(user.records)
        //Load Records associated to user
        const record = await Record.find({ _id: {$in: recordsId} })
        .populate("emotions")
        .populate("causes")
        .populate("symptoms")
        .populate("strategies")


        if (record) {
            return res.status(200).json(record);
        } else {
            return res.status(400).send(`No records found for ${res.locals.user.email} user`)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in loadUserRecords' });
    }
}

//Load all Records of Signed up User
const loadPatientRecords = async (req, res) => {
  try {
    console.log('hola loadpatient')
    //Load Signed up user.ç
    console.log('req.params: ', req.params.patientId)
    const userId = req.params.patientId
    console.log(userId)
    const user = await User.findById(userId) // res.locals.user from checkAuth

    console.log('ostras',user)

    //Records of user
    const recordsId = user.records
    console.log(user.records)
    //Load Records associated to user
    const record = await Record.find({ _id: { $in: recordsId } })
      .populate("emotions")
      .populate("causes")
      .populate("symptoms")
      .populate("strategies")


    if (record) {
      return res.status(200).json(record);
    } else {
      return res.status(400).send(`No records found for ${res.locals.user.email} user`)
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error in loadUserRecords' });
  }
}


//Delete a Record of Signed Up User
const deleteUserRecord = async (req, res) => {
    try {
        //Signed up userId.
        const userId = res.locals.user.id // res.locals.user from checkAuth
        //RecordId to delete.
        const recordId = req.params.recordId

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { records: recordId } },
            { new: true }
          );

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(400).send(`No records found for ${res.locals.user.email} user`)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in deleteUserRecord' });
    }
}

// Controlador para el endpoint que calcula la media de aparición de emociones
const calculateAverageEmotions = async (req, res) => {
  try {
       //Load Signed up user.ç
        const user = await User.findById(res.locals.user.id) // res.locals.user from checkAuth
        console.log('loaduserRecords')

        //Records of user
        const recordsId = user.records
        //Load Records associated to user
        const records = await Record.find({ _id: {$in: recordsId} })
        .populate("emotions")
        .populate("causes")
        .populate("symptoms")
        .populate("strategies")
 const emotionCounts = {};
    const causeCounts = {};
    const strategyCounts = {};

    // Contar la frecuencia de aparición de cada emoción, causa y estrategia en los registros
    records.forEach((record) => {
      record.emotions.forEach((emotion) => {
        emotionCounts[emotion.name] = (emotionCounts[emotion.name] || 0) + 1;
      });

      record.causes.forEach((cause) => {
        causeCounts[cause.name] = (causeCounts[cause.name] || 0) + 1;
      });

      record.strategies.forEach((strategy) => {
        strategyCounts[strategy.name] = (strategyCounts[strategy.name] || 0) + 1;
      });
    });

    // Ordenar las emociones, causas y estrategias según su frecuencia de aparición en orden descendente
    const sortedEmotions = Object.keys(emotionCounts).sort(
      (emotionA, emotionB) => emotionCounts[emotionB] - emotionCounts[emotionA]
    );
    const sortedCauses = Object.keys(causeCounts).sort(
      (causeA, causeB) => causeCounts[causeB] - causeCounts[causeA]
    );
    const sortedStrategies = Object.keys(strategyCounts).sort(
      (strategyA, strategyB) => strategyCounts[strategyB] - strategyCounts[strategyA]
    );

    // Obtener las tres emociones, causas y estrategias más recurrentes
    const topEmotions = sortedEmotions.slice(0, 3);
    const topCauses = sortedCauses.slice(0, 3);
    const topStrategies = sortedStrategies.slice(0, 3);

    // Calcular el total de registros
    const totalRecords = records.length;

    // Calcular la media de aparición de las emociones, causas y estrategias más recurrentes
    const averageData = {
      emotions: {},
      causes: {},
      strategies: {},
    };

    topEmotions.forEach((emotion) => {
      const frequency = emotionCounts[emotion] / totalRecords;
      const percentage = (frequency * 100).toFixed(1);
      averageData.emotions[emotion] = `${percentage}%`;
    });

    topCauses.forEach((cause) => {
      const frequency = causeCounts[cause] / totalRecords;
      const percentage = (frequency * 100).toFixed(1);
      averageData.causes[cause] = `${percentage}%`;
    });

    topStrategies.forEach((strategy) => {
      const frequency = strategyCounts[strategy] / totalRecords;
      const percentage = (frequency * 100).toFixed(1);
      averageData.strategies[strategy] = `${percentage}%`;
    });

    return res.status(200).json(averageData);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error calculating average emotion' });
  }
};

const calculateAverageEmotionsPatient = async (req, res) => {
  try {

    const userId = req.params.patientId
    //Load Signed up user.ç
    const user = await User.findById(userId) // res.locals.user from checkAuth
    console.log('loaduserRecords')

    //Records of user
    const recordsId = user.records
    //Load Records associated to user
    const records = await Record.find({ _id: { $in: recordsId } })
      .populate("emotions")
      .populate("causes")
      .populate("symptoms")
      .populate("strategies")
    const emotionCounts = {};
    const causeCounts = {};
    const strategyCounts = {};


    // Contar la frecuencia de aparición de cada emoción, causa y estrategia en los registros
    records.forEach((record) => {
      record.emotions.forEach((emotion) => {
        emotionCounts[emotion.name] = (emotionCounts[emotion.name] || 0) + 1;
      });

      record.causes.forEach((cause) => {
        causeCounts[cause.name] = (causeCounts[cause.name] || 0) + 1;
      });

      record.strategies.forEach((strategy) => {
        strategyCounts[strategy.name] = (strategyCounts[strategy.name] || 0) + 1;
      });
    });

    // Ordenar las emociones, causas y estrategias según su frecuencia de aparición en orden descendente
    const sortedEmotions = Object.keys(emotionCounts).sort(
      (emotionA, emotionB) => emotionCounts[emotionB] - emotionCounts[emotionA]
    );
    const sortedCauses = Object.keys(causeCounts).sort(
      (causeA, causeB) => causeCounts[causeB] - causeCounts[causeA]
    );
    const sortedStrategies = Object.keys(strategyCounts).sort(
      (strategyA, strategyB) => strategyCounts[strategyB] - strategyCounts[strategyA]
    );

    // Obtener las tres emociones, causas y estrategias más recurrentes
    const topEmotions = sortedEmotions.slice(0, 3);
    const topCauses = sortedCauses.slice(0, 3);
    const topStrategies = sortedStrategies.slice(0, 3);
    const recordDetails = records.map((record) => record.detail);

    // Calcular el total de registros
    const totalRecords = records.length;

    // Calcular la media de aparición de las emociones, causas y estrategias más recurrentes
    const averageData = {
      emotions: {},
      causes: {},
      strategies: {},
      details: recordDetails,
    };

    topEmotions.forEach((emotion) => {
      const frequency = emotionCounts[emotion] / totalRecords;
      const percentage = (frequency * 100).toFixed(1);
      averageData.emotions[emotion] = `${percentage}%`;
    });

    topCauses.forEach((cause) => {
      const frequency = causeCounts[cause] / totalRecords;
      const percentage = (frequency * 100).toFixed(1);
      averageData.causes[cause] = `${percentage}%`;
    });

    topStrategies.forEach((strategy) => {
      const frequency = strategyCounts[strategy] / totalRecords;
      const percentage = (frequency * 100).toFixed(1);
      averageData.strategies[strategy] = `${percentage}%`;
    });

    return res.status(200).json(averageData);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error calculating average emotion' });
  }
};


module.exports = { createUserRecord, loadUserRecords, deleteUserRecord, calculateAverageEmotions, calculateAverageEmotionsPatient }