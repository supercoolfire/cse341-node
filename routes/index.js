const router = require('express').Router();
const express = require('express');
const path = require('path');


router.use('/', express.static(path.join(__dirname, '../frontend')));
router.use('/contacts', require('./contacts'))
router.use('/users', require('./users'))
router.use('/frontend', express.static(path.join(__dirname, '../frontend')));


module.exports = router;