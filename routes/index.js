const router = require('express').Router();
const userCtrl = require('../controllers/user');
const { asyncMiddleware } = require('../middleware');
const { validateUser } = require('../middleware');
const { sanitizeUser } = require('../middleware');
const checkFields = [ sanitizeUser, validateUser ]

// All the user routes
router.get('/users', asyncMiddleware(userCtrl.getUsers));
router.post('/users', checkFields, asyncMiddleware(userCtrl.createUser));
router.get('/users/:id', asyncMiddleware(userCtrl.getUser));
router.put('/users/:id', checkFields, asyncMiddleware(userCtrl.updateUser));
router.delete('/users/:id', asyncMiddleware(userCtrl.deleteUser));

module.exports = router;