const express = require('express')
const router = express.Router()
const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const { getSeanceByCours } = require('../controller/seance')
const { getCoursByIdProf, getCoursParModule } = require('../controller/cours')
const {getFiliereByIdProf} = require('../controller/filiere')
const { getModuleByIdFiliere } = require('../controller/module')


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

    var Filiere = null;

    var coursListParFiliere = []

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

    var coursTeaching = []
    var isTeaching = false

    for (let i = 0; i < coursListParFiliere.length; i++) {
        const course = coursListParFiliere[i];
        


        // Check if the idProf matches the iduser of the course
        if (course.iduser === prof.id) {
            isTeaching = true
            coursTeaching.push(isTeaching )
            coursTeaching.push(course.idcours )
           

            // The idProf teaches this course
            return coursTeaching
        }else{
            isTeaching = false
            coursTeaching.push(isTeaching)
        }
    }
    console.log('------------------------',horaireParCours)

    
    
    return res.render('profDashboard', {coursTeaching, Filiere, coursListParFiliere, coursList, horaireParCours, prof})
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