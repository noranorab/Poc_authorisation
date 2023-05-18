// const { render, clearCache } = require('ejs')
// const express = require('express')
// const { authUser } = require('../basicAuth')
// const router = express.Router()
// // const {modules, users, filieres} = require('../data')
// const {canView} = require('../controller/permissions/filierePerm')


// router.get('/',(req, res)=> {
//     res.render('modules', {modules})
// })

// router.get('/:name', authUser,authGetFiliere,(req,res) => {
//     const name=req.params.name;
//     console.log(req.params)
//     console.log('hello from get modules')
//     res.render('modules', {modules})

// })



// router.post('/', (req, res) => {
//     console.log('hello from post modules')
//     res.render('modules')
// })

// router.put('/', (req, res) => {
//     res.send({data: 'module updated'})
// })

// router.delete('/', (req, res) => {
//     res.send({data : "page deleted"})
// })


// function authGetFiliere(req, res, next){
//     const user = users.find(user => req.session.name === user.username )
//     const filiere = filieres.find(filiere => req.params.name === filiere.name)
//     if (!canView(user,filiere)){
//         res.status(401)
//         return res.send('Not allowed')
//     }
//     next()
// }




// module.exports = router