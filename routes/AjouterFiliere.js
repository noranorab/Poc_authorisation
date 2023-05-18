// const express = require('express')
// const _pgPool = require('../model/db');
// const router = express.Router();
// const {insertFiliere} = require('../model/Filiere');
// const { getUserByName } = require('../model/users');


// router.get('/', (req, res) => {
//     res.render('ajouterFiliere');
// });
// router.post('/', async (req, res) => {
//     console.log("heello from post ajouterFiliere");
//     // const { nom, coordinateur, description } = req.body;
//     // console.log(nom, coordinateur, description)
//     // Vérification des données reçues
//     if (!req.body.nom || !req.body.coordinateur || !req.body.description) {
//         return res.status(400).send('Veuillez remplir tous les champs du formulaire.');
//     }else{
//         const [idUser,,,] = await getUserByName(req.body.coordinateur)
//         await insertFiliere(req.body.nom, req.body.description, idUser) 
//         return res.send('good')   
//     }

//     // Requête SQL pour insérer la matière dans la table "matiere"

    
// });




// module.exports = router;