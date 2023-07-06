const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  professional_email: {
    type: String,
    required: false,
  },
  reminder_day: {
    type: Number,
    default: 1,
  },
  reminder_hour: {
    type: String,
    default: '12:00',
  },
  reminder_send: {
    type: Date,
    default: Date.now,
  },
  });

const User = mongoose.model("User", UserSchema);

module.exports = User;

/* userSchema.methods.welcome = function welcome() {
    const greeting = this.name && 'Welcome ' + this.name
    console.log(greeting);
  } */

