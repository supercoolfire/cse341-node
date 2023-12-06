const router = require('express').Router();
const express = require('express');
const passport = require('passport');
const path = require('path');
const overrideMiddleware = require('./override');

// Serve static files
// router.use('/', express.static(path.join(__dirname, '../frontend')));
router.use('/frontend', express.static(path.join(__dirname, '../frontend')));

router.use('/', require('./swagger'));
// router.get('/', (req, res) => {
//     res.send('Hello week2');
// });

// router.use('/contacts', require('./contacts'));
router.use('/user', require('./user'));
router.use('/users', require('./users'));

router.use(overrideMiddleware);

// router.use('/lesson1', require('./lesson1'));
// router.use('/professional', require('./professional'));

router.get("/login", passport.authenticate("github"));
router.get("/logout", function(req, res, next){
    req.logout(function(err){
        if (err){return next(err);}
        res.redirect("/");
    });
      // Destroy the session
    req.session.destroy((err) => {
        console.log(req.session)
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Internal Server Error");
        }

        // Redirect to the home page or any other desired location after logout
        res.redirect("/");
    });
});



module.exports = router;