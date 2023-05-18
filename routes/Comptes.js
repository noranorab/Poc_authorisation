const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const {getUser, updateUser} = require('../model/users')




router.get('/', async (req,res) => {
    console.log('hello from get comptes')
    const [username, password] = [req.session.name, req.session.password]
    const User = await getAccountUser(username, password);
    const [id ,nom, prenom, role] = await getUser(User.fk_compte_users_id);
    const user = {
        id: id,
        nom: nom,
        prenom: prenom,
        password : password,
        username : username,
        role: role

    }
    console.log('hello from comptes get' ,user)
    res.render('comptes', {user})

})



router.post('/', async (req, res) => {
    console.log('hello from post comptes')
    const {id, nom, prenom, role, password , username} = req.body
    console.log(req.body)
    try {
        const rowCount = await updateUser(nom, prenom, role, id);
        const rowCountAccount = await updateAccount(username, password, id)
        console.log('rowCount from post comptes')
        if (rowCount > 0 || rowCountAccount > 0) {
          // Profile update successful
          return res.status(200).json({ message: 'Profile updated successfully' });
        } else {
          // No rows affected (user not found or no changes made)
          res.status(404).json({ error: 'User not found or no changes made' });
        }
      } catch (error) {
        // Error occurred during profile update
        res.status(500).json({ error: 'Failed to update profile' });
    }

})

router.put('/', (req, res) => {
    res.send({data: 'filier updated'})
})

router.delete('/', (req, res) => {
    res.send({data : "page deleted"})
})




module.exports = router