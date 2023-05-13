const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// const pgPool = new pg.Pool({
//     user: "postgres",
//     password: "zahira 18",
//     database: "follow_up",
//     host: "localhost",
//     port: 5432
// // });

// const pgSessionStore = new pgSession({
//     pool: pgPool,
//     tableName: 'session',
// });

// module.exports = {
//     query: (text, params) => pool.query(text, params)
// };

// module.exports = pgPool;
// module.exports = pgSessionStore;