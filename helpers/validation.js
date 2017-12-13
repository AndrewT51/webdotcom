const { isAlpha, isByteLength, isBefore } = require('validator');
const { constants: { NAME, POSITION_HELD } } = require('../config');
const moment = require('moment-timezone');
const nonWordCharsAndNumbers = new RegExp(/[^\w ]|\d/g)

exports.checkName = name => isAlpha(name) && isByteLength(name, {
  min: NAME.MIN_LENGTH,
  max: NAME.MAX_LENGTH
})

exports.checkTimezone = zone => !!moment.tz.zone(zone)

exports.checkBirthdate = birthdate => isBefore(birthdate)

exports.checkPositionHeld = position => (
  !position.match(nonWordCharsAndNumbers) && isByteLength(position, {
    min: POSITION_HELD.MIN_LENGTH,
    max: POSITION_HELD.MAX_LENGTH
  })
)
