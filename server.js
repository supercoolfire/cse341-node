/*
* npm install express body-parser dotenv passport passport-github2 cors ejs
*/
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongodb = require('./data/database');
const passport = require('passport');
const session = require("express-session");
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
  // This is the basic express session({...}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({ origin: '*'}))
  .use('/', require('./routes'));

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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend"));

app.get("/", (req, res) => {
  const message = req.session.user !== undefined ? `Logged in as ${
    // prevent null
    req.session.user.displayName == null ? req.session.user.username : req.session.user.displayName
  }` : "Successfully logged out";
  res.render("index", { message, req }); // Pass the req object for dynamic login logout link
});
// my mod end *****************************************************

app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false
}),
  (req, res) => {
    req.session.user = req.user;
    mongodb.getDatabase().db().collection('visitors').insertOne({ 
      timestamp: new Date(), 
      metadata: { 
        user: req.user.username,
        displayName: req.user.displayName,
        profileUrl: req.user.profileUrl,
        avatar_url: req.user.photos[0].value,
        }
    });
    
    // console.log(req.user)
    res.redirect("/");
  });

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
