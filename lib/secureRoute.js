function secureRoute(req, res, next) {
  if(!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('alert', 'You must be logged in to access this page');
      return res.redirect('/login');
    });
  }
  next();
}

module.exports = secureRoute;
