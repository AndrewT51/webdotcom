module.exports = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 15
  },
  POSITION_HELD: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20
  },
  FIELDS_TO_SANITIZE: [
    'name',
    'surname',
    'birthdate',
    'timezone',
    'positionHeld'
  ]
}