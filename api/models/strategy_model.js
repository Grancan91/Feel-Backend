const mongoose = require("mongoose");

const StrategySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  });

const Strategy = mongoose.model("strategy", StrategySchema);

module.exports = Strategy;
