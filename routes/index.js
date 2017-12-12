const router = require('express').Router();
const userCtrl = require('../controllers/user');
const { asyncMiddleware } = require('../middleware')

router.get('/users', asyncMiddleware(userCtrl.getUsers));
router.post('/users', asyncMiddleware(userCtrl.createUser));
router.get('/users/:id', asyncMiddleware(userCtrl.getUser));
router.put('/users/:id', asyncMiddleware(userCtrl.updateUser));
router.delete('/users/:id', asyncMiddleware(userCtrl.deleteUser));

module.exports = router;