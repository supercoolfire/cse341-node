const mongodb = require('../data/database');

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";

    // Check if the request is for an API endpoint
    if (req.originalUrl.startsWith('/api')) {
      return res.status(401).json({ message });
    } else {
      // If it's not an API request, render a view or redirect
      res.render("index", { message, req }); // Pass the req object for dynamic login logout link
      // Or redirect to a login page
      // res.redirect('/login');
    }
  } else {
    next();
  }
};

const isAdmin = async (req, res, next) => {
  const user = req.session.user.username;
  
  try {
    const rolesCollection = mongodb.getDatabase().db('project1').collection('roles');
    // console.log(rolesCollection)
    const userRole = await rolesCollection.findOne({ login: user });

    if (userRole && userRole.role === 'admin') {
      req.isAdmin = true;
      req.isModerator = true; // Admins automatically have moderator privileges
      console.log('You are admin');
      next();
    } else {
      res.status(403).json({ message: 'You do not have admin privileges.' });
    }
  } catch (error) {
    console.error('Error checking admin role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const isModerator = async (req, res, next) => {
  // Check if the user is already identified as an admin
  if (req.isAdmin) {
    console.log('You are admin');
    next();
  } else {
    const user = req.session.user.username;

    try {
      const rolesCollection = mongodb.getDatabase().db().collection('roles');
      const userRole = await rolesCollection.findOne({ login: user });

      if (userRole && userRole.role === 'moderator') {
        req.isModerator = true;
        console.log('You are moderator');
        next();
      } else {
        res.status(403).json({ message: 'You do not have moderator privileges.' });
      }
    } catch (error) {
      console.error('Error checking moderator role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};


module.exports = {
  isAuthenticated,
  isAdmin,
  isModerator
};
