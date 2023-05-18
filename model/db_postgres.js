const pg = require('pg');

const _pgPool = new pg.Pool({
 user: "postgres",
 password: "postgres",
 database: "follow_up",
 host: "localhost",
 port: 5432
});

module.exports = {
    query: (text, params) => _pgPool.query(text, params)
};

module.exports = _pgPool;
