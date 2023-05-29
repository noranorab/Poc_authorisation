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
        const User = await getProf(compte[0].fk_compte_users_id);
       
        const prof = {
            id : User[0].idprofesseur,
            nom: User[0].nom,
            prenom: User[0].prenom,
            password : compte[0].password,
            username : compte[0].username,
            role: User[0].role,
            idcompte: compte[0].idcompte

        }
        const coursList = []
        const Cours = await getCoursByIdProf(prof.id)
        for (let i=0; i<Cours.length; i++){
            const cours  = {
                id: Cours[i].idcours,
                nom: Cours[i].nom,
                description: Cours[i].description,
            }
            coursList.push(cours)
        }
        const horaireParCours  = []


        for (let i = 0 ; i<coursList.length; i++){
            const seances_i = await getSeanceByCours(coursList[i].id)
            const length_i = seances_i.length
            let totalHours = 0
            for (let j = 0; j< length_i; j++){
                const finTime = new Date(`1970-01-01T${seances_i[j].heurefin}`);
                const debutTime = new Date(`1970-01-01T${seances_i[j].heuredebut}`);
                const debutTimestamp = debutTime.getTime();
                const finTimestamp = finTime.getTime();

                // Calculate the time difference in milliseconds
                const timeDifference = Math.abs(finTimestamp - debutTimestamp);

                // Convert the time difference to hours
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                totalHours = totalHours + hours
            }
            horaireParCours.push({
                coursid : coursList[i].id,
                nomcours: coursList[i].nom,
                horaire: totalHours
            })
        }
        
        console.log(horaireParCours)
        req.session.name = prof.username
        req.session.password = prof.password
        
        if(prof.role == 'admin'){
                    // anneeUniversitaire.lancerAnneeUniversitaire()
                    // const currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
                return res.render('adminDashboard', { prof})

        }else if(prof.role == 'CF'){
                return res.render('profDashboard', { prof, coursList, seanceList})
        }else if(prof.role == 'CM'){
                return res.render('profDashboard', {prof })
        }else if(prof.role == 'Prof'){
                return res.render('profDashboard', { prof, coursList, horaireParCours })
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

