const express = require('express');
const router = express.Router();

const usersController = require('../controllers/roles');
const validation = require('../middleware/validate');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isModerator, usersController.getAllRoles);
router.get('/:id', isModerator, usersController.getSingleRole);
router.post('/', isModerator, validation.validateUser, usersController.createRole);
router.put('/:id', isAdmin, validation.validateUser, usersController.updateRole);
router.delete('/:id', isGod, usersController.deleteRole);

module.exports = router;