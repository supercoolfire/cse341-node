const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts');
const { validateContact } = require('../middleware/validate-contacts')
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', isAuthenticated, contactController.getAll);
router.get('/:id', isAuthenticated, contactController.getSingle);
router.post('/', isAuthenticated, validateContact, contactController.createContact);
router.put('/:id', isAuthenticated, validateContact, contactController.updateContact);
router.delete('/:id', isAuthenticated, contactController.deleteContact);

module.exports = router;