const express = require('express');
const router = express.Router();

const usersController = require('../controllers/roles');
const validation = require('../middleware/validate');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isGod, usersController.getAllRoles);
router.get('/:id', isGod, usersController.getSingleRole);
router.post('/', isGod, validation.validateUser, usersController.createRole);
router.put('/:id', isGod, validation.validateUser, usersController.updateRole);
router.delete('/:id', isGod, usersController.deleteRole);

module.exports = router;