const User = require('../models/user');

//RENDER LOG IN FORM
function sessionsNew(req, res) {
  res.render('sessions/new');
}

//LOG A USER IN

function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: '‍Unknown login' });
      }

      req.session.userId = user.id;
      res.redirect('/');
    })
    .catch(() => {
      res.status(500).end();
    });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
