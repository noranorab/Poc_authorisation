const { closeDelimiter } = require('ejs')
const express = require('express')
const router = express.Router()
const {users, ROLE}= require('../data')
const anneeUniversitaire = require('../views/js/anneeUniversitaire')


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
        const user = users.find((user) => user.username == username);
        // const filiere = setFilieres(user)
        if(user){
            const validPx = password == user.password? true : false
            if (validPx){
                req.session.name = user.username
                if(user.role == ROLE.ADMIN){
                    anneeUniversitaire.lancerAnneeUniversitaire()
                    const currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
                    return res.render('adminDashboard', {user, currentSchoolYear})

                }else if(user.role == ROLE.CF){
                    res.render({data : 'this is cf page'})
                }else{
                    res.render({data : 'this is cm page'})
                }
            }else{
                console.log('mdp incorrect')
            }
        }else{
            console.log('user doesnt exist')
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

