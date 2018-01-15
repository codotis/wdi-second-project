const Track = require('../models/track');

function indexRoute(req, res, next) {
  Track
    .find()
    .exec()
    .then((tracks) => res.render('tracks/index', { tracks }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('tracks/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Track
    .create(req.body)
    .then(() => res.redirect('/tracks'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/tracks/new', err.toString());
      }
      next(err);
    });
}

function showRoute(req, res, next) {
  Track
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((track) => {
      if(!track) return res.notFound();
      return res.render('tracks/show', { track });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {
      if(!track) return res.notFound();
      return res.render('tracks/edit', { track });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {
      if(!track) return res.notFound();

      track = Object.assign(track, req.body);

      return track.save();
    })
    .then(() => res.redirect(`/tracks/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/tracks/${req.params.id}/edit`, err.toString());
      }
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {
      if(!track) return res.notFound();
      return track.remove();
    })
    .then(() => res.redirect('/tracks'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {
      if(!track) return res.notFound();

      track.comments.push(req.body);
      return track.save();
    })
    .then((track) => {
      res.redirect(`/tracks/${track.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/tracks/${req.params.id}`, err.toString());
      }
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {
      if(!track) return res.notFound();

      const comment = track.comments.id(req.params.commentId);
      comment.remove();

      return track.save();
    })
    .then((track) => {
      res.redirect(`/tracks/${track.id}`);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
