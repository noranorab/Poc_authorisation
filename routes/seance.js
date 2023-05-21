const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const {getCoursByIdProf} = require('../controller/cours')
const { getSeanceByCours } = require('../controller/seance')



router.get('/', async (req, res) => {
    const username = req.session.name
    const password = req.session.password
    const compte = await getCompte(username, password);
    const User = await getProf(compte[0].fk_compte_users_id);
    const courseId = req.params.courseId;
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
    // const seanceList = []

    for (let i=0; i<Cours.length; i++){
            const cours  = {
                id: Cours[i].idcours,
                nom: Cours[i].nom,
                description: Cours[i].description,
            }
            coursList.push(cours)
    }
    // const Seances = await getSeanceByCours(courseId)
    // console.log(Seances)
    // if (Seances.length > 0){
    //     for(let i = 0; i<Seances.length; i++){
    //         const seance = {
    //             id : Seances[i].idseance,
    //             date : Seances[i].date,
    //             hd : Seances[i].heuredebut,
    //             hf : Seances[i].heurefin,
    //             obj : Seances[i].objectifs,
    //             rmq : Seances[i].remarques,
    //             idcours : Seances[i].fk_seance_cours_id
    //         }
    //         seanceList.push(seance)
    //     }        
    // }else{
    //     console.log("pas de séance")
    // }

    // console.log('hello from get seanceList')
    return res.render('seance', {courseId, coursList})
})


router.post('/', (req, res) => {
    console.log('hello from post seance')
    res.render('modules')
})

router.put('/', (req, res) => {
    res.send({data: 'seance updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})


module.exports = router