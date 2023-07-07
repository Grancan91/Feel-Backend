const mongoose = require("mongoose");

const CauseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  });

const Cause = mongoose.model("cause", CauseSchema);

module.exports = Cause;