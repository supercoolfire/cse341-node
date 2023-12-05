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

module.exports = {
  isAuthenticated
};
