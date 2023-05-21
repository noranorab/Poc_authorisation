const { render } = require('ejs')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    return res.render('seance')
})


router.post('/', (req, res) => {
    console.log('hello from post seance')
    res.render('modules')
})

router.put('/', (req, res) => {
    res.send({data: 'seance updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})


module.exports = router