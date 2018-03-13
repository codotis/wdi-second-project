const router = require('express').Router();

const statics = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const tracks = require('../controllers/tracks');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.route('/')
  .get(statics.index);

router.route('/tracks')
  .get(tracks.index)
  .post(secureRoute, tracks.create);

router.route('/tracks/new')
  .get(secureRoute, tracks.new);

router.route('/tracks/:id')
  .get(tracks.show)
  .put(secureRoute, tracks.update)
  .delete(secureRoute, tracks.delete);

router.route('/tracks/:id/edit')
  .get(secureRoute, tracks.edit);

router.route('/tracks/:id/comments')
  .post(tracks.createComment);

router.route('/tracks/:id/comments/:commentId')
  .delete(tracks.deleteComment);

router.route('/users/:id')
  .get(users.show);

router.route('/users/follow/:id')
  .get(users.follow);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
