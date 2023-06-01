// const express = require('express');
// const router = express.Router();
// const users = require('../model/users')


// //revoke permission
// router.put('/users/:id/revoke/:permission', async (req, res)=>{
//     const {id, permission} = req.params;
//     try{
//         const result = users.revokePermission
//         res.json(result.rows[0])
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// })

// //grant permission
// router.put('/users/:id/grant/:permission', async (req, res)=>{
//     const {id, permission} = req.params;
//     try{
//         const result = users.grantPermission
//         res.json(result.rows[0])
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// })

// const authPage = (permission)=>{
//     return (req, res, next) => {
//         const userRole = req.body.role
//         if(permission.includes(userRole)){
//             next()
//         }else{
//             return res.status(401).json("YOU DONT HAVE PERMISSION")
//         }
//     }

// }


// module.exports = {router, authPage}