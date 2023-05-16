const { closeDelimiter } = require('ejs')
const express = require('express')
const router = express.Router()
const {users, ROLE}= require('../data')
const anneeUniversitaire = require('../views/js/anneeUniversitaire')
const {getAccountUser} = require('../model/comptes')
const {getUser} = require('../model/users')

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
        const User = await getAccountUser(username, password);
        const [id ,nom, prenom, role] = await getUser(User.fk_compte_users_id);
        const user = {
            id : id,
            nom: nom,
            prenom: prenom,
            password : password,
            username : username,
            role: role

        }
        console.log(user)
        // const filiere = setFilieres(user)
        console.log(req.session)
                req.session.name = user.username
                req.session.password = user.password
                if(user.role == ROLE.ADMIN){
                    anneeUniversitaire.lancerAnneeUniversitaire()
                    const currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
                    return res.render('adminDashboard', { user, currentSchoolYear})

                }else if(user.role == ROLE.CF){
                    res.render({data : 'this is cf page'})
                }else{
                    res.render({data : 'this is cm page'})
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

