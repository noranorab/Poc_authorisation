const express = require('express');
const pg = require('pg');
const router = express.Router();

// const app = express();
const port = 3000;

// app.use(express.urlencoded({ extended: true })); // Middleware pour analyser les données POST

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'authentification',
    password: 'zahira 18',
    port: 5432,
});

router.get('/', (req, res) => {
    res.render('addMatiere');
});
router.post('/', (req, res) => {
    console.log("heello from post addmatiere");
    const { nom, Cordinateur, Description } = req.body;

    // Vérification des données reçues
    if (!nom || !Cordinateur || !Description) {
        return res.status(400).send('Veuillez remplir tous les champs du formulaire.');
    }

    // Requête SQL pour insérer la matière dans la table "matiere"
    const query = 'INSERT INTO filiere (nom, cordinateur, description) VALUES ($1, $2, $3)';
    const values = [nom, Cordinateur, Description];

    pool.query(query, values, (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête.', error);
            return res.status(500).send('Une erreur est survenue lors de l\'ajout de la matière.');
        }

        return res.status(200).send('La matière a été ajoutée avec succès.');
    });
});




module.exports = router;