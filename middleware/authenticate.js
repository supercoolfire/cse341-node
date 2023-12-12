const mongodb = require('../data/database');

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(req, res, 403, message);
  } else {
    next();
  }
};

function filterAPI(req, res, status, message) {
  const data = {
    message: message,
    req: req,
  };
  res.status(status).render('index', data);
}

const isGod = async (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(req, res, 401, message);
  } else {
    const user = req.session.user.username;
    
    try {
      const rolesCollection = mongodb.getDatabase().db().collection('roles');
      // console.log(rolesCollection)
      const userRole = await rolesCollection.findOne({ login: user });

      if (userRole && userRole.role === 'god') {
        req.isGod = true;
        req.isAdmin = true;
        req.isModerator = true; // Admins automatically have moderator privileges
        console.log('You are almighty');
        next();
      } else {
        message = 'You do not have mighty super user privileges.';
        filterAPI(req, res, 403, message);
      }
    } catch (error) {
      console.error('Error checking mighty super user role:', error);
      message = 'Internal server corrupted by evil thing.';
      filterAPI(req, res, 500, message);
    }
  }
};

const isAdmin = async (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(req, res, 401, message);
  } else {
    const user = req.session.user.username;
    
    try {
      const rolesCollection = mongodb.getDatabase().db().collection('roles');
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
        message = 'You do not have admin privileges.';
        filterAPI(req, res, 403, message);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      message = 'Internal server error';
      filterAPI(req, res, 500, message);
    }
  }
};

const isModerator = async (req, res, next) => {
  if (req.session.user === undefined) {
    const message = "You do not have access. You need to login";
    filterAPI(req, res, 401, message);
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
        message = 'You do not have moderator privileges.';
        filterAPI(req, res, 403, message);
      }
    } catch (error) {
      console.error('Error checking moderator role:', error);
      message = 'Internal server error';
      filterAPI(req, res, 500, message);
    }
  }
};


module.exports = {
  isAuthenticated,
  isGod,
  isAdmin,
  isModerator
};
