const mongoose = require('mongoose');
const { NAME, POSITION_HELD } = require('../config/constants');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'The name field is required',
    minlength: NAME.MIN_LENGTH,
    maxlength: NAME.MAX_LENGTH,
  },
  surname: {
    type: String,
    required: 'The surname field is required',
    minlength: NAME.MIN_LENGTH,
    maxlength: NAME.MAX_LENGTH,
  },
  birthdate: String,
  timezone: String,
  positionHeld: {
    type: String,
    minlength: POSITION_HELD.MIN_LENGTH,
    maxlength: POSITION_HELD.MAX_LENGTH
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema);