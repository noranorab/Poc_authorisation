const express = require('express')
const router = express.Router()
const {users} = require('../data')
const anneeUniversitaire = require('../views/js/anneeUniversitaire')



router.get('/',(req, res)=> {
    console.log('hello form dashboard')
    const user = users.find((user) => user.username == req.session.name);
    anneeUniversitaire.lancerAnneeUniversitaire('2022/2023', '1')
    const currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
    res.render('adminDashboard', {user, currentSchoolYear})
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