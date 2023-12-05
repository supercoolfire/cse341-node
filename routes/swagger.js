const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { isAuthenticated } = require("../middleware/authenticate");

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocument));

// router.use('/api-docs', isAuthenticated, swaggerUI.serve);
// router.get('/api-docs', isAuthenticated, swaggerUI.setup(swaggerDocument));

module.exports = router;