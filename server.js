/*
* npm install express body-parser dotenv passport passport-github2 cors ejs
*/
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));
// This is the basic express session({...}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session"
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Z-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({ origin: '*'}));
app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  console.log('GitHub authentication successful');
  // console.log('accessToken');
  // console.log(accessToken);
  // console.log('refreshToken');
  // console.log(refreshToken);
  // console.log('profile');
  // console.log(profile);
  // console.log('done');
  // console.log(done);
  // Additional logging or processing if needed
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


// app.get("/", (req, res)=>{ res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Successfully logged out")});

// my mod start *****************************************************
const path = require('path');
// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/static/frontend'));


// my mod end *****************************************************


// Error Handling
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`);});
  }
});
