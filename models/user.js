const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthdate: String,
  timezone: String,
  positionHeld: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema);