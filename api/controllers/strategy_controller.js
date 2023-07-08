
const Strategy = require('../models/strategy_model');

//Load all Strategies available
const loadStrategy = async (req, res) => {
    try {
        //Load Strategy list.
        const strategy = await Strategy.find()

        if (strategy) {
            return res.status(200).json(strategy);
        } else {
            return res.status(400).send(`No Strategies found`)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in loadStrategies' });
    }
}

//Create a new Strategy
const createStrategy = async (req, res) => {
    try {
        const strategy = await Strategy.create(req.body)
        res.status(200).json(strategy)
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).json({"error": "Strategy already exists"});
        } else {
            res.status(500).json({ error: 'Error in create strategy' });
        }
    }
}

module.exports = { loadStrategy, createStrategy }