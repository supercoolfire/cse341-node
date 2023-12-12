const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isAuthenticated, usersController.getAllUsers);
router.get('/:id', isAuthenticated, usersController.getSingleUser);
router.post('/', isModerator, validation.validateUser, usersController.createUser);
router.put('/:id', isAdmin, validation.validateUser, usersController.updateUser);
router.delete('/:id', isGod, usersController.deleteUser);

module.exports = router;