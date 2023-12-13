const router = require('express').Router();
const express = require('express');
const githubRoute = require('./githubRoute')
const passport = require('passport');
const path = require('path');
const overrideMiddleware = require('./override');

// Serve static files
router.use('/static', express.static(path.join(__dirname, '../static')));
router.use('/frontend', express.static(path.join(__dirname, '../static/frontend')));

router.use('/', require('./swagger'));
router.use('/contacts/', require('./contacts'));
router.use('/github', githubRoute);
router.use('/lesson1', require('./lesson1'));
// router.use('/professional', require('./professional'));
router.use(overrideMiddleware);
router.use('/roles', require('./roles'));
router.use('/user', require('./user'));
router.use('/users', require('./users'));

router.get("/", (req, res) => {
  if (req.session.user !== undefined) {
    // console.log(`req.session.user: ${req.session.user}`);
    if (req.session.user.displayName !== null) {
      // console.log(`req.session.user.displayName: ${req.session.user.displayName}`);
      res.locals.message = `Logged in as ${req.session.user.displayName}`;
    } else {
      // console.log(`req.session.user.username: ${req.session.user.username}`);
      res.locals.message = `Logged in as ${req.session.user.username}`;
    }
  } else {
    if (req.session.goodbye == true) {
      res.locals.message = 'Thank you for visiting. You are successfully logged out!';
      // console.log(`1 res.locals.message: ${res.locals.message}`);
      req.session.goodbye = false;
    } else {
      // console.log(`0 res.locals.message: ${res.locals.message}`);
      res.locals.message = "Register now, it's FREE!";
    }
  }
  const data = {
    message: res.locals.message,
    req
  };
  res.render("index", data); // Pass the req object for dynamic login logout link
  });

router.get("/login", passport.authenticate("github"));
router.get("/logout", function(req, res, next){
  req.session.goodbye = true;
  // req.logout((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  // })
  req.session.user = undefined;
  console.log(`logout req.session.goodbye: ${req.session.goodbye}`)
  res.redirect("/");
});

module.exports = router;