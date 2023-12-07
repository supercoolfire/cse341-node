const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isModerator, usersController.getAllUsers);
router.get('/:id', isAuthenticated, usersController.getSingleUser);
router.post('/', isAdmin, validation.validateUser, usersController.createUser);
router.put('/:id', isAuthenticated, validation.validateUser, usersController.updateUser);
router.delete('/:id', isAdmin, usersController.deleteUser);

module.exports = router;
