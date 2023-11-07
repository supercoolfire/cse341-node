const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => { res.send('Hello wolrds');});

router.get('/frontend', (req, res) => { 
  const filePath = path.join(__dirname, 'frontend', 'index.html');
  res.sendFile(filePath);
});

module.exports = router;