const express = require('express');
const router = express.Router();

const usersController = require('../controllers/roles');
const { validateRoles } = require('../middleware/validate-roles');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isGod, usersController.getAllRoles);
router.get('/:id', isGod, usersController.getSingleRole);
router.post('/', isGod, validateRoles, usersController.createRole);
router.put('/:id', isGod, validateRoles, usersController.updateRole);
router.delete('/:id', isGod, usersController.deleteRole);

module.exports = router;