
const Cause = require('../models/cause_model');

//Load all Causes available
const loadCauses = async (req, res) => {
    try {
        //Load Cause list.
        const causes = await Cause.find()

        if (causes) {
            return res.status(200).json(causes);
        } else {
            return res.status(400).send(`No Causes found`)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in loadCauses' });
    }
}

//Create a new Cause
const createCause = async (req, res) => {
    try {
        const cause = await Cause.create(req.body)
        res.status(200).json(cause)
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).json({"error": "Cause already exists"});
        } else {
            res.status(500).json({ error: 'Error in create cause' });
        }
    }
}

module.exports = { loadCauses, createCause }