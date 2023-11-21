const router = require('express').Router();
const express = require('express');
const path = require('path');

router.use('/', require('./swagger'));
// router.get('/', (req, res) => {
//     res.send('Hello week2');
// });

router.use('/', express.static(path.join(__dirname, '../frontend')));
router.use('/frontend', express.static(path.join(__dirname, '../frontend')));
router.use('/contacts', require('./contacts'));
router.use('/user', require('./user'));
router.use('/users', require('./users'));
router.use('/lesson1', require('./lesson1'));
router.use('/professional', require('./professional'));


module.exports = router;