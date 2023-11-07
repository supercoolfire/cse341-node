const router = require('express').Router();
const express = require('express');
const path = require('path');

router.get('/', (req, res) => { res.send('Hello wolrds');});

router.use('/users', require('./users'))

router.use('/frontend', express.static(path.join(__dirname, '../frontend')));
router.get('/frontend', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.htm'));
});

module.exports = router;