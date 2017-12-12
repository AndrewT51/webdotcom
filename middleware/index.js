const validation = require('../helpers/validation')

// I took this middleware from https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
// used to wrap async functions with error handling instead of throwing try/catch statements in every route
exports.asyncMiddleware = fn =>
  (req, res, next) => {
    return Promise.resolve(fn(req, res, next))
    .catch(next);
  };

exports.validateUser = (req, res, next) => {
  const { name, surname, birthdate, timezone, positionHeld } = req.body
  const { checkTimezone, checkName, checkBirthdate, checkPositionHeld } = validation;
  console.log(name);
  if (!checkTimezone(timezone)){
    throw new Error('Invalid timezone')
  }
  if (!checkName(name) || !checkName(surname)){
    throw new Error('Invalid name')
  }
  if (!checkBirthdate(birthdate)){
    throw new Error('Invalid birthdate')
  }
  if (!checkPositionHeld(positionHeld)){
    throw new Error('Invalid position')
  }
  next()
}