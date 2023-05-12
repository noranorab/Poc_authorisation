const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.get('/', (req, res) => {
    if (req.session.user) {
        if (req.session.user.username.toLowerCase() === "alice") {
            res.sendFile(__dirname + '../admin.html');
        } else if (req.session.user.username.toLowerCase() === 'professeur') {
            res.sendFile(__dirname + '/prof.html');
        } else {
            res.send(`Bienvenue, ${req.session.user.username} ! <br><a href="/logout">Se déconnecter</a>`);
        }
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

router.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});

router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    userModel.login(username, password, (err, result) => {
        if (err) {
            console.log(err);
            res.send('Erreur de base de données');
        } else if (result) {
            req.session.user = { username: result.username };
            res.redirect('/');
        } else {
            res.send('Nom d\'utilisateur ou mot de passe incorrect');
        }
    });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    userModel.register(username, password, (err, result) => {
        if (err) {
            console.log(err);
            res.send('Erreur de base de données');
        } else if (result === 'existingUsername') {
            res.send('Nom d\'utilisateur déjà utilisé');
        } else {
            req.session.user = { username };
            res.redirect('/');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;