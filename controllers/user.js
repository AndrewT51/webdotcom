const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUsers = (req, res, next) => {
  User.find()
  .then( users => {
    res.json(users)
  })
}

exports.getUser = (req, res, next) => {
  User.findById( req.params.id )
  .then( user => {
    res.send(user);
  })
}

exports.createUser = (req, res, next) => {
  User.create(req.body)
  .then(()=> {
    res.send('well done');
  })
}

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate( req.params.id, req.body, { new: true } )
  .then( updatedUser => {
    res.send(updatedUser);
  })
}

exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove( req.params.id )
  .then( deletedUser => {
    res.send(deletedUser);
  })
}