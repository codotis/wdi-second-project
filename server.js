const express        = require('express');
const morgan         = require('morgan');
const bodyParser = require('body-parser');
const session        = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const routes         = require('./config/routes');
const User           = require('./models/user');
const mongoose       = require('mongoose');
mongoose.Promise     = require('bluebird');
const { port, env, dbURI, secret } = require('./config/environment');

const app = express();

mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
if(env === 'development') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
  if (!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) => {

      req.session.userId = user._id;

      res.locals.user = user;
      res.locals.isLoggedIn = true;

      next();
    });

  // IF WE CANT FIND THE USER
  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          res.redirect('/');
        });
      }

      req.session.userId = user._id;

      res.locals.user = user;
      res.locals.isLoggedIn = true;

      next();
    });
});


app.use(routes);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
