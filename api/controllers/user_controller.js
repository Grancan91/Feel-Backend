const Record = require("../models/record_model");
const User = require("../models/user_model");

//Load all Records of User
const saveRecords = async (req, res) => {
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

module.exports = { getUsers, createUser };
