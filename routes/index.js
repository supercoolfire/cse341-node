const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello wolrds');});

router.get('/frontend', (req, res) => {
  res.sendFile('../frontend/index.html');
});

module.exports = router;