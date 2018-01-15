const User = require('../models/user');

//RENDER REGISTRATION FORM
function newRoute(req, res) {
  res.render('registrations/new');
}


//FOR REGISTERING A USER

function createRoute(req, res){
  User
    .create(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match! Please try again.' });
      }
      res.status(500).send(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
