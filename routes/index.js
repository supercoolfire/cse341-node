const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello wolrds');});

router.get('/frontend', (req, res) => { res.send('ello wolrds');});

module.exports = router;