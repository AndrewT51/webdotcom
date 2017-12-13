const mongoose = require('mongoose');
const User = mongoose.model('User');
const { queryBuilder } = require('../helpers/controllers');

exports.getUsers = async (req, res, next) => {
  const query = queryBuilder(req.query)
  const users = await User.find(query)
  res.json(users)
}

exports.getUser = async (req, res, next) => {
  const user = await User.findById( req.params.id )
  res.send(user);
}

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body)
  res.send(newUser);
}

exports.updateUser = async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate( req.params.id, req.body, { new: true } )
  res.send(updatedUser);
}

exports.deleteUser = async (req, res, next) => {
  const deletedUser = User.findByIdAndRemove( req.params.id )
  res.send(deletedUser);
}