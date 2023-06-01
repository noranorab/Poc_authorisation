const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }else{
            return res.redirect('/connexion')
        }
        
    })
})

router.post('/', (req, res) => {
    
})

router.put('/', (req, res) => {
    res.send({data: 'page updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})

module.exports = router