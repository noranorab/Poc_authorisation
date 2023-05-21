const {getCompte} = require('../controller/compte')
const {getProf} = require('../controller/prof')
const { getCoursByIdProf } = require('../controller/cours')
const { getSeanceByCours } = require('../controller/seance')


const setVariables = async (req, res, next) => {
    const {username, password} = [req.session.name, req.session.password]
    const compte = await getCompte(username, password);
    const User = await getProf(compte[0].fk_compte_users_id);
    const prof = {
            id : User[0].idprofesseur,
            nom: User[0].nom,
            prenom: User[0].prenom,
            password : compte[0].password,
            username : compte[0].username,
            role: User[0].role

    }
    const coursList = []
    const Cours = await getCoursByIdProf(prof.id)
    const seanceList = []
    const Seances = await getSeanceByCours(prof.id)

    for (let i=0; i<Cours.length; i++){
            const cours  = {
                id: Cours[i].idcours,
                nom: Cours[i].nom,
                description: Cours[i].description,
            }
            coursList.push(cours)
    }

    for(let i = 0; i<Seances.length; i++){
        const seance = {
            id : Seances[i].idseance,
            date : Seances[i].date,
            hd : Seances[i].heuredebut,
            hf : Seances[i].heurefin,
            obj : Seances[i].objectifs,
            rmq : Seances[i].remarques,
            idcours : Seances[i].fk_seance_cours_id
        }
        seanceList.push(seance)
    }

    res.locals.prof = prof;
    res.locals.coursList = coursList
    res.locals.seanceList = seanceList
    req.session.name = prof.username
    req.session.password = prof.password

    next()
}

module.exports = setVariables
