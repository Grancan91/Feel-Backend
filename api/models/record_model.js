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
  emotions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'emotion'
    }
  ],
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

