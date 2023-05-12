const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'authentification',
    password: 'zahira 18',
    port: 5432,
});

const userModel = {
    create: (username, gmail, password, role, callback) => {
        const query = 'INSERT INTO users (username, gmail, password, role) VALUES ($1, $2, $3, $4)';
        const values = [username, gmail, password, role];
        pool.query(query, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        pool.query(query, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows[0]);
            }
        });
    },
};

module.exports = userModel;