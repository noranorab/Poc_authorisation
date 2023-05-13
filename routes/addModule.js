const express = require('express');
const pg = require('pg');
const router = express.Router();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // Middleware pour analyser les données POST

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'authentification',
    password: 'zahira 18',
    port: 5432,
});

router.get('/', (req, res) => {
    res.render('addModule');
});
module.exports = router;