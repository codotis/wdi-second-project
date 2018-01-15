const express  = require('express');
const router   = express.Router();

const tracks = require('../controllers/tracks');


const statics = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');



router.route('/')
  .get(statics.index);

router.route('/tracks')
  .get(tracks.index)
  .post(tracks.create);

router.route('/tracks/new')
  .get(tracks.new);

router.route('/tracks/:id')
  .get(tracks.show)
  .put(tracks.update)
  .delete(tracks.delete);

router.route('/tracks/:id/edit')
  .get(tracks.edit);


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);




module.exports = router;
