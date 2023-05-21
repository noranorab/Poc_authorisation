const { closeDelimiter } = require('ejs')
const express = require('express')
const router = express.Router()
// const {users, ROLE}= require('../data')
const anneeUniversitaire = require('../views/js/anneeUniversitaire')
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const { getCoursByIdProf } = require('../controller/cours')
const { getSeanceByCours } = require('../controller/seance')

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
        const coursList = []
        const Cours = await getCoursByIdProf(prof.id)
        const seanceList = []
        for (let i=0; i<Cours.length; i++){
            const cours  = {
                id: Cours[i].idcours,
                nom: Cours[i].nom,
                description: Cours[i].description,
            }
            coursList.push(cours)
        }
        console.log(coursList)
        req.session.name = prof.username
        req.session.password = prof.password
        console.log(req.session)
        if(prof.role == 'admin'){
                    // anneeUniversitaire.lancerAnneeUniversitaire()
                    // const currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
                return res.render('adminDashboard', { prof})

        }else if(prof.role == 'CF'){
                return res.render('profDashboard', { prof, coursList, seanceList})
        }else if(prof.role == 'CM'){
                return res.render('profDashboard', {prof })
        }else if(prof.role == 'Prof'){
                return res.render('profDashboard', { prof, coursList})
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

