const mongodb = require('../data/database');

exports.githubCallback = (req, res) => {
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
  
  res.redirect('/');
};
