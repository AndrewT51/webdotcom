const { isAlpha, isByteLength, isBefore } = require('validator');
const { constants: { NAME, POSITION_HELD } } = require('../config');
const moment = require('moment-timezone');
const nonWordCharsAndNumbers = new RegExp(/[^\w ]|\d/g)

// check the name is entirely letters and of a length
// within a specified range
exports.checkName = name => isAlpha(name) && isByteLength(name, {
  min: NAME.MIN_LENGTH,
  max: NAME.MAX_LENGTH
})

// ensure the timezone is a valid one
exports.checkTimezone = zone => !!moment.tz.zone(zone)

// ensure the birthdate is not later than today, and implicitly
// if it is a valid date
exports.checkBirthdate = birthdate => isBefore(birthdate)

// check the position held is only made of letters and spaces
// and of a designated length
exports.checkPositionHeld = position => (
  !position.match(nonWordCharsAndNumbers) && isByteLength(position, {
    min: POSITION_HELD.MIN_LENGTH,
    max: POSITION_HELD.MAX_LENGTH
  })
)
