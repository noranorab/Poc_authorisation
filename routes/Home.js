const express = require('express')
const { authUser, authRole } = require('../basicAuth')
const router = express.Router()
const {ROLE} = require('../data')


// router.get('/',authUser, authRole(ROLE.ADMIN), (req,res) => {
//     console.log("hello from get home")
//     const {user} = res.locals
//     console.log({user})
//     if(req.session.id){
//         res.render('filieres', {user})
//     }else{
//          res.render('connexion')
//     }
    
// })

// router.post('/', (req, res) => {
//     console.log("hello from post home")
//     // const {user} = res.locals
//     return res.render('filieres')
// })

router.put('/', (req, res) => {
    res.send({data: 'page updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})

module.exports = router