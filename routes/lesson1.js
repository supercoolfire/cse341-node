const express = require('express');
const app = express();
const lesson1Controller = require('./controllers/lesson1')

app.get('/johnnywwalker', lesson1Controller.johnnyRoute)
app.get('/creepycrawler', lesson1Controller.creepyRoute)
app.get('/speedyggonzales', lesson1Controller.speedyRoute)
app.get('/slowpokerramirez', lesson1Controller.slowRoute)

module.exports = app;