const router = require('express').Router();
const express = require('express');

router.use((req, res, next) => {
    const queryParameter = req.query.role;
    roles = ['god', 'admin', 'moderator', 'default'];
    currentUser = req.session.user ? req.session.user.username !== undefined ? req.session.user.username : '' : '';
    if (queryParameter) {
        
        // console.log('override req.session.user:', JSON.stringify(req.session.user, null, 2));
        if (req.query.role === 'god' && (req.session.user === undefined || roles.includes(currentUser))) {
            console.log('switching to god mode')
            req.session.user = {}
            req.session.user = { username: 'Thor', displayName: 'Thor' }
            res.locals.message = `Logged in as ${req.session.user.username}`;
            return res.redirect(req.originalUrl);
        } else if (req.query.role === 'admin' && (req.session.user === undefined || roles.includes(req.session.user.username))) {
            console.log('switching to admin mode')
            req.session.user = {}
            req.session.user = { username: 'theadmin', displayName: 'theadmin' }
            return res.redirect(req.originalUrl);
        } else if (req.query.role === 'moderator' && (req.session.user === undefined || roles.includes(req.session.user.username))) {
            console.log('switching to moderator mode')
            req.session.user = {}
            req.session.user = { username: 'themoderator', displayName: 'themoderator' }
            return res.redirect(req.originalUrl);
        } else if (req.query.role === 'default' && (req.session.user === undefined || roles.includes(req.session.user.username))) {
            console.log('switching to default mode')
            req.session.user = {}
            req.session.user = { username: 'Earthling', displayName: 'Earthling' }
            return res.redirect(req.originalUrl);
        }
        console.log(`Role query parameter found: ${queryParameter}`)
        // console.log(res.locals.message);
    }
    next();
});
 
module.exports = router;