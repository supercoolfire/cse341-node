const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isAdmin, isModerator, usersController.getAllUsers);
router.get('/:id', isAuthenticated, usersController.getSingleUser);
router.post('/', isAuthenticated, validation.validateUser, usersController.createUser);
router.put('/:id', isAuthenticated, validation.validateUser, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;
