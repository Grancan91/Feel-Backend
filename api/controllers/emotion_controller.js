
const Emotion = require('../models/emotion_model');

//Load all Emotions available
const loadEmotions = async (req, res) => {
    try {
        //Load Emotion list.
        const emotions = await Emotion.find()

        if (emotions) {
            return res.status(200).json(emotions);
        } else {
            return res.status(400).send(`No emotions found`)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in loadEmotions' });
    }
}

module.exports = { loadEmotions }