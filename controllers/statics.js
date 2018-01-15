const User = require('../models/user');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('index', { users }))
    .catch((err) => console.log('ERR', err));
}

function secretRoute(req, res) {
  res.render('secret');
}

module.exports = {
  index: indexRoute,
  secret: secretRoute
};
