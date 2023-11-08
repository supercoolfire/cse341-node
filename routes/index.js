const router = require('express').Router();
const express = require('express');
const path = require('path');


router.use('/', express.static(path.join(__dirname, '../frontend')));
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.htm'));
});
// router.get('/', (req, res) => { res.send('Hello wolrds');});

router.use('/contacts', require('./contacts'))
router.use('/usersnpm', require('./users'))

router.use('/frontend', express.static(path.join(__dirname, '../frontend')));
router.get('/frontend', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.htm'));
});

module.exports = router;