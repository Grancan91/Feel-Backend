const mongoose = require("mongoose");

const EmotionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false, //For dev False, True when api for url done
  },
  });

const Emotion = mongoose.model("emotion", EmotionSchema);

module.exports = Emotion;
