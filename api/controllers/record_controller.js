
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
        //Load Signed up user.
        const user = await User.findById(res.locals.user.id) // res.locals.user from checkAuth

        //Records of user
        const recordsId = user.records
        //Load Records associated to user
        const record = await Record.find({ _id: {$in: recordsId} })
        //Return a Records found.
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


module.exports = { createUserRecord, loadUserRecords, deleteUserRecord }