const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-second-project';
const secret = process.env.SESSION_SECRET || '8W!%7jhWEg3U';

module.exports = { port, env, dbURI, secret };
