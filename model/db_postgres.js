const pg = require('pg');

const _pgPool = new pg.Pool({
 user: "",
 password: "",
 database: "",
 host: "",
 port: 
});

module.exports = {
    query: (text, params) => _pgPool.query(text, params)
};

module.exports = _pgPool;
