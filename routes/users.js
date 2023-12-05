const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

// week2
router.post('/', isAuthenticated, userController.createUser);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;