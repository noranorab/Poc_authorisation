const express = require('express')
const router = express.Router()



router.get('/',(req, res)=> {
    res.render('adminDashboard')
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