const mongodb = require('../data/database');

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(req, res, message);
  } else {
    next();
  }
};

function filterAPI(req, res, message) {
  // Check if the request is for an API endpoint
  if (req.originalUrl.startsWith('/api')) {
    return res.status(401).json({ message });
  } else {
    const data = {
      message: message,
      req: req ,
    };
    res.render('frontend/index', data);
  }
}

const isGod = async (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(res, message);
  } else {
    const user = req.session.user.username;
    
    try {
      const rolesCollection = mongodb.getDatabase().db('project1').collection('roles');
      // console.log(rolesCollection)
      const userRole = await rolesCollection.findOne({ login: user });

      if (userRole && userRole.role === 'god') {
        req.isGod = true;
        req.isAdmin = true;
        req.isModerator = true; // Admins automatically have moderator privileges
        console.log('You are almighty');
        next();
      } else {
        res.status(403).json({ message: 'You do not have mighty super user privileges.' });
      }
    } catch (error) {
      console.error('Error checking mighty super user role:', error);
      res.status(500).json({ message: 'Internal server corrupted by evil thing.' });
    }
  }
};

const isAdmin = async (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(res, message);
  } else {
    const user = req.session.user.username;
    
    try {
      const rolesCollection = mongodb.getDatabase().db('project1').collection('roles');
      // console.log(rolesCollection)
      const userRole = await rolesCollection.findOne({ login: user });

      if (userRole && userRole.role === 'god') {
        req.isGod = true;
        req.isAdmin = true;
        req.isModerator = true; // Admins automatically have moderator privileges
        console.log('You are admin');
        next();
      }
      else if (userRole && userRole.role === 'admin') {
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
  }
};

const isModerator = async (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(res, message);
  } else {
    const user = req.session.user.username;

    try {
      const rolesCollection = mongodb.getDatabase().db().collection('roles');
      const userRole = await rolesCollection.findOne({ login: user });

      if (userRole && userRole.role === 'god') {
        req.isGod = true;
        req.isAdmin = true;
        req.isModerator = true; // Admins automatically have moderator privileges
        console.log('You are admin');
        next();
      }
      else if (userRole && userRole.role === 'admin') {
        req.isModerator = true;
        req.isAdmin = true;
        console.log('You have moderator privileges.');
        next();
      } 
      else if (userRole && userRole.role === 'moderator') {
        req.isModerator = true;
        console.log('You have moderator privileges.');
        next();
      } 
      else {
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
  isGod,
  isAdmin,
  isModerator
};
