const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  emotion: {
    type: String,
    required: true,
  },
  emotion_url: {
    type: String,
    required: true,
  },
  cause: {
    type: String,
    required: true,
  },
  symptom: {
    type: String,
    required: true,
  },
  strategy: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  record_date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Record = mongoose.model("record", RecordSchema);

module.exports = Record;

/* userSchema.methods.welcome = function welcome() {
    const greeting = this.name && 'Welcome ' + this.name
    console.log(greeting);
  } */

