const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// week2
app.use(bodyParser.json()); // order is important, this line before routes
// week2 Add swagger API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Controll-Allow_headers',
    'Origin, X-Requested-Width, Content-Type, Accept,z-key'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if(err)   {
    console.log(err);
  } else {
    app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`);});
  }
});


