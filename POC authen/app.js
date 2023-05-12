const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require('pg');

const app = express();
const port = 3000;

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'authentification',
    password: 'zahira 18',
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    if (req.session.user) {
        if (req.session.user.username.toLowerCase() === "alice") {
            res.sendFile(__dirname + '/admin.html');
        } else if (req.session.user.username.toLowerCase() === 'professeur') {
            res.sendFile(__dirname + '/prof.html');
        } else {
            res.send(`Bienvenue, ${req.session.user.username} ! <br><a href="/logout">Se déconnecter</a>`);
        }
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html');


});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    pool.query(`SELECT * FROM users WHERE username = $1 AND password = $2`, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send('Erreur de base de données');
        } else if (result.rows.length === 1) {
            req.session.user = { username: result.rows[0].username };
            res.redirect('/');
        } else {
            res.send('Nom d\'utilisateur ou mot de passe incorrect');
        }
    });
});


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    pool.query(`SELECT * FROM users WHERE username = $1`, [username], (err, result) => {
        if (err) {
            console.log(err);
            res.send('Erreur de base de données');
        } else if (result.rows.length === 1) {
            res.send('Nom d\'utilisateur déjà utilisé');
        } else {
            pool.query(`INSERT INTO users (username,gmail, password,role) VALUES ($1, $2)`, [username, password], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send('Erreur de base de données');
                } else {
                    req.session.user = { username };
                    res.redirect('/');
                }
            });
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});





app.post('/add-matiere', (req, res) => {
    const { nom, description, module } = req.body;
    pool.query('SELECT * FROM matieres WHERE nom = $1', [nom], (err, result) => {
        if (err) {
            console.log(err);
            res.send('Erreur de base de données');
        } else if (result.rows.length === 1) {
            res.send('Nom de matière déjà utilisé');
        } else {
            pool.query('INSERT INTO matieres (nom, description, module) VALUES ($1, $2, $3)', [nom, description, module], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send('Erreur de base de données');
                } else {
                    res.send('Matière ajoutée avec succès');
                }
            });
        }
    });
});




app.post('/add-prof', (req, res) => {
    const { username, gmail, password, role } = req.body;
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
            console.log(err);
            res.send('Erreur de base de données');
        } else if (result.rows.length === 1) {
            res.send('Nom de prof déjà utilisé');
        } else {
            pool.query('INSERT INTO users (username, gmail, password, role) VALUES ($1, $2, $3,$4)', [username, gmail, password, role], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send('Erreur de base de données');
                } else {
                    res.send('prof ajoutée avec succès');
                }
            });
        }
    });
});


app.post('/add-module', (req, res) => {
    const query = 'INSERT INTO modules (nom) VALUES ($1)';
    const values = ['Nom du module'];
    client.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});
app.post('/add-filiere', (req, res) => {
    const query = 'INSERT INTO filieres (nom) VALUES ($1)';
    const values = ['Nom de la filière'];
    client.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});
app.get('/add-matiere', (req, res) => {
    res.sendFile(__dirname + '/add-matiere.html');
});
app.get('/add-prof', (req, res) => {
    res.sendFile(__dirname + '/add-prof.html');
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});