const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userShcema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// fire a function before doc saved to db
userShcema.pre('save', async function (next) {
  // Hashing Password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('user', userShcema);

module.exports = User;