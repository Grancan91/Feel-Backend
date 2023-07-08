
const Symptom = require('../models/symptom_model');

//Load all Symptoms available
const loadSymptoms = async (req, res) => {
    try {
        //Load symptom list.
        const symptom = await Symptom.find()

        if (symptom) {
            return res.status(200).json(symptom);
        } else {
            return res.status(400).send(`No Symptoms found`)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in loadSymptoms' });
    }
}

//Create a new Symptom
const createSymptom = async (req, res) => {
    try {
        const symptom = await Symptom.create(req.body)
        res.status(200).json(symptom)
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).json({"error": "Symptom already exists"});
        } else {
            res.status(500).json({ error: 'Error in create Symptom' });
        }
    }
}

module.exports = { loadSymptoms, createSymptom }