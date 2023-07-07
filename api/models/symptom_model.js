const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  });

const Symptom = mongoose.model("symptom", SymptomSchema);

module.exports = Symptom;
