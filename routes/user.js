const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const validation = require('../middleware/validate');
const { isGod } = require('../middleware/authenticate');

router.get('/', isGod, userController.getAll);
router.get('/:id', isGod, userController.getSingle);
router.post('/', isGod, validation.validateUser, userController.createUser);
router.put('/:id', isGod, validation.validateUser, userController.updateUser);
router.delete('/:id', isGod, userController.deleteUser);

module.exports = router;
