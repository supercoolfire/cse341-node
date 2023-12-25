const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { validateUser } = require('../middleware/validate-users');
const { accessLevel } = require('../middleware/authenticate-accessLevel');

router.get('/', accessLevel(1), usersController.getAllUsers);
router.get('/:id', accessLevel(1), usersController.getSingleUser);
router.post('/', accessLevel(4), validateUser, usersController.createUser);
router.put('/:id', accessLevel(4), validateUser, usersController.updateUser);
router.delete('/:id', accessLevel(4), usersController.deleteUser);

module.exports = router;