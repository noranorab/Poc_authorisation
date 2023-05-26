const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const {getCoursByIdProf} = require('../controller/cours')
const { getSeanceByCours, insertSeance } = require('../controller/seance')



router.get('/seance/:courseId', async (req, res) => {
    const username = req.session.name
    const password = req.session.password
    const compte = await getCompte(username, password);
    const User = await getProf(compte[0].fk_compte_users_id);
    const courseId = req.params.courseId;
    console.log('hello from seance', courseId)
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

    for (let i=0; i<Cours.length; i++){
            const cours  = {
                id: Cours[i].idcours,
                nom: Cours[i].nom,
                description: Cours[i].description,
            }
            coursList.push(cours)
    }
    const seanceList = []
    const Seances = await getSeanceByCours(courseId)
    console.log(Seances)
    if (Seances.length > 0){
        for(let i = 0; i<Seances.length; i++){
            const seance = {
                id : Seances[i].idseance,
                date : Seances[i].date,
                hd : Seances[i].heuredebut,
                hf : Seances[i].heurefin,
                obj : Seances[i].objectifs,
                rmq : Seances[i].remarques,
                idcours : Seances[i].fk_seance_cours_id
            }
            seanceList.push(seance)
        }        
    }else{
        console.log("pas de séance")
    }

    console.log('hello from get seanceList')
    return res.render('seance', {courseId, coursList, seanceList})
})


router.post('/seance', async (req, res) => {
    console.log('Hello from post seance',req.body)
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

    for (let i=0; i<Cours.length; i++){
            const cours  = {
                id: Cours[i].idcours,
                nom: Cours[i].nom,
                description: Cours[i].description,
            }
            coursList.push(cours)
    }

    const seance = {
        numero: req.body.numero,
        date: req.body.date,
        hd : req.body.heureDebut,
        hf : req.body.heureFin,
        obj : req.body.objectifs,
        rmq: req.body.remarques
    }
    const courseId = req.body.courseId;
    const seanceList = []
    const Seances = await getSeanceByCours(courseId)
    console.log(Seances)
    if (Seances.length > 0){
        for(let i = 0; i<Seances.length; i++){
            const seance = {
                id : Seances[i].idseance,
                date : Seances[i].date,
                hd : Seances[i].heuredebut,
                hf : Seances[i].heurefin,
                obj : Seances[i].objectifs,
                rmq : Seances[i].remarques,
                idcours : Seances[i].fk_seance_cours_id,
                numero : Seances[i].numero
            }
            seanceList.push(seance)
        }        
    }else{
        console.log("pas de séance")
    }


    
    console.log('----------------------------', seance)

  try {
    const Seance = await insertSeance(seance.date, seance.hd, seance.hf, seance.obj, seance.rmq, courseId, seance.numero);
    console.log( Seance);
    return res.render('seanceList', {Seance, coursList, seanceList, courseId});
  } catch (error) {
    console.error('An error occurred:', error);

    // Send an error response to the client
    res.status(500).send('An error occurred while inserting the seance');
  }

})

router.put('/', (req, res) => {
    res.send({data: 'seance updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})


module.exports = router