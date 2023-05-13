const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const { users, filieres, ROLE } = require('../data')
const { authUser, authRole } = require('../basicAuth')



router.get('/', (req, res) => {
    console.log('hello from get filieres')
    res.render('filieres', { filieres })

})
router.get('/add-matiere', (req, res) => {
    res.sendFile(__dirname + '/addMatiere.ejs');
})



router.post('/', (req, res) => {
    console.log('hello from post filieres')
    res.render('filieres')
})

router.put('/', (req, res) => {
    res.send({ data: 'filier updated' })
})

router.delete('/', (req, res) => {
    res.send({ data: "page deleted" })
})






module.exports = router