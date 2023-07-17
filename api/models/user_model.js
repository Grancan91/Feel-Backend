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
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (emotions) {
        return emotions.length > 0;
      },
      message: 'El campo "email" es requerido.',
    },
  },
  password: {
    type: String,
    required: true,
  },
  professional_email: {
    type: String,
    required: false,
  },
  reminder_freq: {
    type: Number,
    default: 0,
  },
  reminder_time: {
    type: String,
    //default: '12:00',
  },
  reminder_send: {
    type: Date,
    //default: Date.now,
  },
  rol: {
    type: String,
    default: 'user',
  },
  img: {
    type: String,
    default: 'https://openmoji.org/data/color/svg/1F468-200D-1F9B2.svg',
  },
  records: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'record'
    }
  ]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;