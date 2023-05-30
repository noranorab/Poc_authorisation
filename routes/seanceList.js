const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const { getCoursByIdProf, getCoursParModule } = require('../controller/cours')
const { getSeanceByCours } = require('../controller/seance')
const {getFiliereByIdProf} = require('../controller/filiere')
const { getModuleByIdFiliere } = require('../controller/module')


/* routes */

router.get('/seanceList/:courseId', async (req, res) => {
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
            console.log('----------------------------', seance)
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



    console.log('hello from get seanceList', seanceList)
    return res.render('seanceList', { prof, Filiere, coursListParFiliere, courseId, coursList, seanceList})

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