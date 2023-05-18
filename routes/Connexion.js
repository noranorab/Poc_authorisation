const { closeDelimiter } = require('ejs')
const express = require('express')
const router = express.Router()
// const {users, ROLE}= require('../data')
const anneeUniversitaire = require('../views/js/anneeUniversitaire')
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')

// function getUser(req, res, next){
//     const userId = req.body.id
//     if (userId){
//         req.user = users.find(user => user.id === userId)
//     }
// }

router.get('/',(req,res) => {
    console.log('helo from get COnnexion')
    res.render('connexion')
})

router.post('/', async (req, res) => {
    console.log('hello from post connexion')
    const {username, password} = req.body
    if (username && password){
        const compte = await getCompte(username, password);
        console.log(compte)
        const User = await getProf(compte[0].fk_compte_users_id);
        console.log(User)
        const prof = {
            id : User[0].idprofesseur,
            nom: User[0].nom,
            prenom: User[0].prenom,
            password : compte[0].password,
            username : compte[0].username,
            role: User[0].role

        }
        console.log(prof)
        // const filiere = setFilieres(user)
        req.session.name = prof.username
        req.session.password = prof.password
        console.log(req.session)
        if(prof.role == 'admin'){
                    // anneeUniversitaire.lancerAnneeUniversitaire()
                    // const currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
                return res.render('adminDashboard', { prof})

        }else if(prof.role == 'CF'){
                return res.render('profDashboard', { prof})
        }else if(prof.role == 'CM'){
                return res.render('profDashboard', { prof})
        }else if(prof.role == 'Prof'){
                return res.render('profDashboard', { prof})
        }else{
                return res.render({data : 'this is  page'})
        }
    }
    console.log('hello from here ')
    res.redirect('connexion')

})

router.put('/', (req, res) => {
    res.send({data: 'page updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})

module.exports = router

