const mongoose = require("mongoose");

const StrategySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  });

const Strategy = mongoose.model("strategy", StrategySchema);

module.exports = Strategy;
