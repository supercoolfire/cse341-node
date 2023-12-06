const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAdmin } = require('../middleware/authenticate');

router.get('/', isAdmin, usersController.getAllUsers);
router.get('/:id', isAdmin, usersController.getSingleUser);
router.post('/', isAdmin, validation.validateUser, usersController.createUser);
router.put('/:id', isAdmin, validation.validateUser, usersController.updateUser);
router.delete('/:id', isAdmin, usersController.deleteUser);

module.exports = router;
