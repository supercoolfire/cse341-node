/*
 * Created by: Jayser Pilapil
 * Copyleft 2023 Jayser Pilapil. All rights reserved.
 * anyone or anytwo or anywho or anywhat is allowed to use this code.
 * Used in CSE341: Web Services
 * 
 * database:
 {
  "login": "myusername",
  "accessLevel": 4
 }
 * if use are using userName instead of login, replace
 mongodb.getDatabase().db().findOne({ login: username });
 * with 
 mongodb.getDatabase().db().findOne({ userName: username });
 *
 * 
 * Sample usage:
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', accessLevel(4), usersController.getAllUsers);
 * 
 *
 * If you are not using app.set('view engine', 'ejs');
 * replace
 res.status(status).render('frontend/index', data);
 * with
 res.redirect("/");
 * 
 * frontend/index is in the folder where app.use(express.static('static')); declared
 * 
 */
const mongodb = require('../data/database'); // Update the path as needed

async function getUserAccessLevel(username) {
  try {
    const rolesCollection = mongodb.getDatabase().db().collection('roles');
    const userAccessLevelDoc = await rolesCollection.findOne({ login: username });

    return userAccessLevelDoc ? userAccessLevelDoc.accessLevel : null;
  } catch (error) {
    console.error('Error fetching user access level from MongoDB:', error);
    return null;
  }
}

function filterAPI(req, res, status, message) {
  const data = {
    message: message,
    req: req,
  };
  res.status(status).render('index', data);
}

function generateAccessLevelMiddlewareInteger(requiredLevel) {
  return async (req, res, next) => {
    const user = req.session.user;

    if (!user || !user.username) {
      filterAPI(req, res, 401, 'Unauthorized: You need to login.');
    } else {
      // Fetch user's access level from MongoDB
      const userAccessLevel = await getUserAccessLevel(user.username);

      console.log(`User Access Level: ${userAccessLevel}, Required Level: ${requiredLevel}`);

      if (userAccessLevel !== null && typeof userAccessLevel === 'number') {
        // Check if the user's access level is equal or higher than the required level
        if (userAccessLevel >= requiredLevel) {
          // User has the required access level, proceed to the next middleware or route
          next();
        } else {
          // User does not have the required access level
          filterAPI(req, res, 403, 'Forbidden: Insufficient access level.');
        }
      } else {
        // Unable to fetch user access level or invalid required level
        filterAPI(req, res, 500, 'Internal server error.');
      }
    }
  };
}

// Exporting the access level middleware function with integer requiredLevel
module.exports = {
  accessLevel: generateAccessLevelMiddlewareInteger,
};