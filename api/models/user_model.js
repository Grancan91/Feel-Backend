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
  records: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: 'record'
    }
  ]
  });

const User = mongoose.model("user", UserSchema);

module.exports = User;

// Añadir Emociones
// Añadir Causas

/* userSchema.methods.welcome = function welcome() {
    const greeting = this.name && 'Welcome ' + this.name
    console.log(greeting);
  } */
