const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { validateUser } = require('../middleware/validate');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isAuthenticated, usersController.getAllUsers);
router.get('/:id', isAuthenticated, usersController.getSingleUser);
router.post('/', isAuthenticated, validateUser, usersController.createUser);
router.put('/:id', isAuthenticated, validateUser, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;