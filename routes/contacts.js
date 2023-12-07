const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts');
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', contactController.getAll);
router.get('/:id', contactController.getSingle);

// week2
router.post('/', isAuthenticated, validation.validateContact, contactController.createContact);
router.put('/:id', isAuthenticated, validation.validateContact, contactController.updateContact);
router.delete('/:id', isAuthenticated, contactController.deleteContact);

module.exports = router;