
const Record = require('../models/record_model');
const User = require('../models/user_model');

//Create new Record
const createRecord = async (req, res) => {
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
            return res.status(500).json({ error: 'Error in create Record' });
        }
    }
}

/*
Esta cargando todos los records indiscriminadamente, hacer que cargue solo lo snecesarios
*/


//Load all Records of User
const loadUserRecords = async (req, res) => {
    try {
        //Load all Records of Signed up user.
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
        return res.status(500).json({ error: 'Error in load Records' });
    }
}

module.exports = { createRecord, loadUserRecords }