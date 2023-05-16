const db = require('./db');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const pgPool = db

const pgSessionStore = new pgSession({
    pool: pgPool,
    tableName: 'session',
  });

module.exports = {
  query: (text, params) => pgPool.query(text, params)
};

module.exports = pgPool;
module.exports = pgSessionStore;