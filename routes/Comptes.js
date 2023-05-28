const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getCompte, updateCompte} = require('../controller/compte')
const {getProf, updateProf} = require('../controller/prof')
const {getCoursByIdProf} = require('../controller/cours')



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
    
    console.log('hello from comptes get' ,prof)
    res.render('comptes', {prof, coursList})

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
    
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})




module.exports = router