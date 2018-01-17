const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('followers following')
    .exec()
    .then(user => {
      // find all tracks where the createdBy matches the current user id



      res.render('users/show', { user });
    })  
    .catch(next);
}


function followRoute(req, res, next) {
  const followerId = req.params.id;
  const currentUserId = req.user.id;

  User
    .findById(currentUserId)
    .exec()
    .then(user => {
      user.following.push(followerId);
      user.save();

      return User.findById(followerId).exec();
    })
    .then(user => {
      user.followers.push(currentUserId);
      return user.save();
    })
    .then(user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

module.exports = {
  follow: followRoute,
  show: showRoute
};
