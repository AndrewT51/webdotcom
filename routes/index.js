const router = require('express').Router();
const userCtrl = require('../controllers/user');

router.get('/users', userCtrl.getUsers);
router.post('/users', userCtrl.createUser);
router.get('/users/:id', userCtrl.getUser);
router.put('/users/:id', userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

module.exports = router;