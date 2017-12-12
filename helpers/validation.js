const { isAlpha, isByteLength, isBefore } = require('validator');
const { constants } = require('../config');
const moment = require('moment-timezone');
const nonWordCharsAndNumbers = new RegExp(/[^\w ]|\d/g)

exports.checkName = name => isAlpha(name) && isByteLength(name, {
  min: constants.NAME.MIN_LENGTH,
  max: constants.NAME.MAX_LENGTH
})

exports.checkTimezone = zone => !!moment.tz.zone(zone)

exports.checkBirthdate = birthdate => isBefore(birthdate)

exports.checkPositionHeld = position => (
  !position.match(nonWordCharsAndNumbers) && isByteLength(position, {
    min: constants.POSITION_HELD.MIN_LENGTH,
    max: constants.POSITION_HELD.MAX_LENGTH
  })
)
