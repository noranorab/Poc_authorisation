const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getCompte, updateCompte, getCompteByUsername, updatePassword} = require('../compte')
const {getProf, updateProf} = require('../prof')
const { getCoursByIdProf, getCoursParModule } = require('../cours')
const {getFiliereByIdProf} = require('../filiere')
const { getModuleByIdFiliere } = require('../module')




router.get('/', async (req,res) => {
    console.log('hello from get comptes')
    const username = req.session.name
    const password = req.session.password
    const compte = await getCompte(username, password);
    const User = await getProf(compte[0].fk_compte_users_id);
    // const courseId = req.params.courseId;
    const prof = {
            id : User[0].idprofesseur,
            nom: User[0].nom,
            prenom: User[0].prenom,
            password : compte[0].password,
            username : compte[0].username,
            role: User[0].role,
            idcompte : compte[0].idcompte

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
    
    console.log('hello from comptes get' ,prof)
    res.render('comptes', {prof,Filiere,coursListParFiliere  ,coursList})

})



router.post('/', async (req, res) => {
    try{
        console.log('--------------------------------------', req.body)
        const {id, nom, prenom, role, password, username, idcompte} = req.body
        const compte = await updateCompte(idcompte, username ,password, id)
        console.log(compte)
        const prof = await updateProf(id, nom, prenom, role)    
        console.log(prof)

        if (compte[0]>0 & prof[0]>0){
            res.json({ message: 'Profiles updated successfully' });
        }
    }catch(error) {
        // Error occurred during profile update
        res.status(500).json({ error: 'Failed to update profiles' });
    }
})

router.put('/', async (req, res) => {
    console.log('hello from put methofd')
    try {
            const {username, new_password} = req.body
            const compte = await getCompteByUsername(username);
            console.log(compte)
            var rowCount = await updateCompte(compte[0].idcompte, username ,new_password, compte[0].id);
        
            if (rowCount[0] >0 ) {
            // Profile update successful
                res.status(200).json({ message: 'mdp updated successfully' });
            } else {
            // No rows affected (user not found or no changes made)
            res.status(404).json({ error: 'mdp not found or no changes made' });
            }
        
      } catch (error) {
        // Error occurred during profile update
        res.status(500).json({ error: 'Failed to update mdp' });
    }
    
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})




module.exports = router