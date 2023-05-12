const {ROLE, users} = require('../../data')


function canView(user, e ){
    return (
        user.role === ROLE.ADMIN ||
        e.userId == user.id
    )
}

function canViewCours(module, cours){
    return(
        module.name === cours.idModule
    )
}

module.exports = {
    canView,
    canViewCours
}