const express = require('express');
const mongodb = require('./data/database');
const app = express();
const lesson1Controller = require('./controllers/lesson1')
const port = process.env.PORT || 3000;

app.get('/johnnywwalker', lesson1Controller.johnnyRoute)
app.get('/creepycrawler', lesson1Controller.creepyRoute)
app.get('/speedyggonzales', lesson1Controller.speedyRoute)
app.get('/slowpokerramirez', lesson1Controller.slowRoute)

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err)   {
    console.log(err);
  } else {
    app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`);});
  }
});


