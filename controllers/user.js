const mongoose = require('mongoose');
const User = mongoose.model('User');
const { queryBuilder } = require('../helpers/controllers');


// Route to get all users. This route is capable of filtering
// the results by the given querystring
exports.getUsers = async (req, res, next) => {
  const query = queryBuilder(req.query);
  const users = await User.find(query);
  res.status(200).json(users)
}

// Gets a single user by id. The unique id needs to be given
// as a param
exports.getUser = async (req, res, next) => {
  const user = await User.findById( req.params.id )
  res.status(200).json(user);
}

// Create a user. Fields for this should be sanitized and
// validated
exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body)
  res.status(201).json(newUser);
}

// Update an existing user. Fields for this are sanitized and
// validated
exports.updateUser = async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate( req.params.id, req.body, { new: true } )
  res.status(200).json(updatedUser);
}

// Remove a user by id. Id should be given as a param
exports.deleteUser = async (req, res, next) => {
  const deletedUser = await User.findByIdAndRemove( req.params.id )
  res.status(200).json(deletedUser);
}