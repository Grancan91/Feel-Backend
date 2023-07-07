
const Record = require('../models/record_model');

//Create new Record
const createRecord = async (req, res) => {
    try {
        //Create Record from req.body
        const record = await Record.create(req.body)
        //Return a Record created
        return res.status(200).json(record);
    } catch (error) {
        if (error.name === 'ValidationError') {
            //If Emotions empty
            return res.status(400).send(error.message)
        } else {
            return res.status(500).json({ error: 'Error in create Record' });
        }
    }
}

//Load all Records of User
const loadRecords = async (req, res) => {
    try {
        //Load all Records from of given email user.
        const record = await Record.find({ email: req.body.email })
        //Return a Records found.
        if (record) {
            return res.status(200).json(record);
        } else {
            return res.status(400).send(`No records found for ${req.body.email} user`)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in load Records' });
    }
}

module.exports = { createRecord, loadRecords }