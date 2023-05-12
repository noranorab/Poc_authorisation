const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {cours, users} = require('../data')
const {canView} = require('../controller/permissions/filierePerm')
const {authUser} = require('../basicAuth')

router.get('/', (req, res) => {
    res.render('cours', {cours})
})

router.get('/:name',authUser, (req,res) => {
    const name = req.params.name
    console.log(req.params)
    console.log('hello from get cours')
    res.render('cours', {cours})

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

function authGetCours(req, res, next){
    const moduleName = req.params.name
    const coursObj = cours.find(coursObj => moduleName === coursObj.name)
    if (!canViewCours(user,cours)){
        res.status(401)
        return res.send('Not allowed')
    }
    next()
}

module.exports = router