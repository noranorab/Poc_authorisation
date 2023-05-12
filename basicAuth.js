const {users, ROLE} = require('./data')


function authUser(req, res, next){
    const user = users.find(user => user.username === req.session.name)
    console.log(user)
    if(user.role == ROLE.ADMIN){
        res.render('adminDashboard')
    }else if(user.role == ROLE.CF){
        res.render({data : 'this is cf page'})
    }else{
        res.render({data : 'this is cm page'})
    }
    next()
}

function authRole(role) {
    return (req, res, next) =>{
        const user = users.find(user => user.username === req.session.name)
        if (user.role === role){
            res.status(401)
            return res.send('Not allowed')
        }

        next()
    }
}

module.exports = {
    authUser,
    authRole
}