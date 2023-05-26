const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const {getCoursByIdProf} = require('../controller/cours')
const { getSeanceByCours } = require('../controller/seance')


/* routes */

router.get('/seanceList/:courseId', async (req, res) => {
    const username = req.session.name
    const password = req.session.password
    const compte = await getCompte(username, password);
    const User = await getProf(compte[0].fk_compte_users_id);
    const courseId = req.params.courseId;
    console.log('---------courseId', courseId)
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
    const Seances = await getSeanceByCours(courseId)
    console.log('-------------------------------', Seances)
    if (Seances.length > 0){
        for(let i = 0; i<Seances.length; i++){
            const seance = {
                date : Seances[i].date,
                hd : Seances[i].heuredebut,
                hf : Seances[i].heurefin,
                obj : Seances[i].objectifs,
                rmq : Seances[i].remarques,
                idcours : Seances[i].fk_seance_cours_id,
                numero : Seances[i].numero
            }
            seanceList.push(seance)
            console.log('----------------------------', seance)
        }        
        
    }else{
        console.log("pas de séance")
    }

    console.log('hello from get seanceList', seanceList)
    return res.render('seanceList', {courseId, coursList, seanceList})

    // Assuming you have a Sequelize model for 'seance'
    // const seanceList = await getSeanceByCours(courseId)
    // console.log(seanceList)
    // res.json(seanceList)
    // return res.render('seanceList', {seanceList})
})


router.post('/', (req, res) => {
    
    console.log('hello from post cours')
    res.render('modules')
})

router.put('/', (req, res) => {
    res.send({data: 'cours updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})



module.exports = router