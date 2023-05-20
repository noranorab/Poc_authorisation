const { render } = require('ejs')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
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


module.exports = router