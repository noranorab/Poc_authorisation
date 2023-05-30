const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const {getCoursByIdProf, getCoursParModule } = require('../controller/cours')
const { getSeanceByCours, insertSeance, updateSeance, deleteSeanceById } = require('../controller/seance')
const {getFiliereByIdProf} = require('../controller/filiere')
const { getModuleByIdFiliere } = require('../controller/module')



router.get('/seance/:courseId', async (req, res) => {
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
    var Filiere = null;

    const coursListParFiliere = []
    console.log('--------------------', prof)
    if (prof.role == 'CF'){
            Filiere = await getFiliereByIdProf(prof.id)
            console.log(Filiere)
            const filiere = {
                id : Filiere[0].idfiliere,
                nom :  Filiere[0].nom,
                description :  Filiere[0].description,
                iduser :  Filiere[0].fk_filiere_users_id
            }
            console.log('----------------', filiere)
            const Modules = await getModuleByIdFiliere(filiere.id)
            console.log('-----modules--------', Modules)

    
            for (var i =0; i<Modules.length; i++){
                let cours = await getCoursParModule(Modules[i].idmodule)
                let coursModule = {
                    idcours : cours[0].idcours,
                    nom : cours[0].nom,
                    description : cours[0].description,
                    iduser : cours[0].fk_cours_users_id,
                    idmodule : cours[0].fk_cours_modules_id
                } 
                console.log('--------cours--------', coursModule)
                coursListParFiliere.push(coursModule)
            }
               
    }

    console.log('hello from get seanceList')
    return res.render('seance', {prof, Filiere, coursListParFiliere, courseId, coursList, seanceList})
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
  try {
    const Seance = await insertSeance(seance.date, seance.hd, seance.hf, seance.obj, seance.rmq, courseId, seance.numero);
    console.log( Seance);
    return res.redirect('/seanceList/' + courseId)
    // return res.render('seanceList', {seance, coursList, seanceList, courseId});
  } catch (error) {
    console.error('An error occurred:', error);

    // Send an error response to the client
    res.status(500).send('An error occurred while inserting the seance');
  }

})

router.put('/seance/:seanceId', async (req, res) => {
  console.log('Hello from put seance')

    const {id, date, hd, hf, obj , rmq, numero} = req.body
    try {
        const rowCount = await updateSeance(id, {date, hd, hf, obj , rmq, numero})
        if (rowCount[0] >0 ) {
          // Profile update successful
          res.status(200).json({ message: 'Seance updated successfully' });
        } else {
          // No rows affected (user not found or no changes made)
          res.status(404).json({ error: 'Seance not found or no changes made' });
        }
      } catch (error) {
        // Error occurred during profile update
        res.status(500).json({ error: 'Failed to update seance' });
    }
})

router.delete('/seance/:seanceId', async (req, res) => {
    const seanceId = req.params.seanceId;

  try {
    // Find the seance by its ID
    const seance = await deleteSeanceById(seanceId)
    console.log('hello from delete', seance)
    // Seance successfully deleted
    if (seance.success) {
      return res.json({ success: true, message: 'Seance deleted successfully' });
    } else {
      return res.json({ success: false, message: 'Failed to delete seance' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports = router