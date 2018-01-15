const User = require('../models/user');

//RENDER LOG IN FORM
function newRoute(req, res) {
  res.render('sessions/new');
}

//LOG A USER IN

function createRoute(req, res) {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: 'Unrecognised credentials‍' });
      }

      req.session.userId = user.id;
      res.redirect('/');
    })
    .catch(() => {
      res.status(500).end();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
