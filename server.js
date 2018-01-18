const express        = require('express');
const morgan         = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
const routes         = require('./config/routes');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');
const customResponses = require('./lib/customResponses');

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

app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(authentication);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
