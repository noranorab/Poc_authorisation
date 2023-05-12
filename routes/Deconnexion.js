const express = require('express')
const router = express.Router()

router.get('/logout', (req,res) => {
    res.send({data: "deconnexion..."})
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }else{
            res.clearCookie(req.session.name)
            return res.redirect('/connexion')
        }
        
    })
})

router.put('/', (req, res) => {
    res.send({data: 'page updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})

module.exports = router