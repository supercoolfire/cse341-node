const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongodb = require('../data/database'); 

router.get("/callback", passport.authenticate("github", {
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

module.exports = router;
