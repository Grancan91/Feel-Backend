const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: false,
  },
  record_date: {
    type: Date,
    default: Date.now,
  },
  emotions: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'emotion'
    }],
    validate: {
      validator: function (emotions) {
        return emotions.length > 0;
      },
      message: 'El campo "emotions" es requerido.',
    },
  },
  causes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cause'
    }
  ],
  symptoms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'symptom'
    }
  ],
  strategies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'strategy'
    }
  ],
});

const Record = mongoose.model("record", RecordSchema);

module.exports = Record;

