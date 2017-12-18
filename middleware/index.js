const validation = require('../helpers/validation');
const { trim, escape } = require('validator');
const { FIELDS_TO_SANITIZE } = require('../config').constants;


// I took this middleware from
// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
// used to wrap async functions with error handling instead of throwing try/catch
// statements in every route
exports.asyncMiddleware = fn =>
  (req, res, next) => Promise.resolve(fn(req, res, next))
    .catch(next);

// Middleware for validating the user fields
exports.validateUser = (req, res, next) => {
  try {
    const validationErrors = [];
    const {
      name, surname, birthdate, timezone, positionHeld,
    } = req.body;
    const {
      checkTimezone, checkName, checkBirthdate, checkPositionHeld,
    } = validation;
    if (timezone && !checkTimezone(timezone)) {
      validationErrors.push('Invalid timezone');
    }
    if ((name && !checkName(name)) || (surname && !checkName(surname))) {
      validationErrors.push('Invalid name or surname');
    }
    if (birthdate && !checkBirthdate(birthdate)) {
      validationErrors.push('Invalid birthdate');
    }
    if (positionHeld && !checkPositionHeld(positionHeld)) {
      validationErrors.push('Invalid position held');
    }
    if (validationErrors.length) {
      return res.status(400).send({ errors: validationErrors });
    }
  } catch (err) {
    return next(err);
  }
  return next();
};

// Middleware to sanitize user fields - escape special characters,
// remove consecutive spaces and trim whitespace either side
exports.sanitizeUser = ({ body }, res, next) => {
  FIELDS_TO_SANITIZE.forEach((field) => {
    if (!body[field]) return;
    body[field] = escape(trim(body[field])).replace(/ +/g, ' ');
  });
  next();
};
