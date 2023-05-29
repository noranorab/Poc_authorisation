const express = require('express')
const router = express.Router()
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const {getCoursByIdProf} = require('../controller/cours')
const { getSeanceByCours } = require('../controller/seance')

// const anneeUniversitaire = require('../views/js/anneeUniversitaire')



router.get('/', async (req, res)=> {
    console.log('hello from get profDashboard')
    const username = req.session.name
    const password = req.session.password
    const compte = await getCompte(username, password);
    const User = await getProf(compte[0].fk_compte_users_id);
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
    console.log('------------------------',horaireParCours)

    
    
    return res.render('profDashboard', {coursList, horaireParCours, prof})
    // const user = users.find((user) => user.username == req.session.name);
    // anneeUniversitaire.lancerAnneeUniversitaire('2022/2023', '1')
    // const currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
    // res.render('adminDashboard', {user, currentSchoolYear})
})


router.post('/', (req, res) => {
    console.log('hello from post admin ')
    res.render('admin')
})

router.put('/', (req, res) => {
    res.send({data: 'admin dashboard updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "admin dashboard deleted"})
})

module.exports = router