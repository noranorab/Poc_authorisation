const express = require("express");
const app = express();
const PORT = 6969;
const {Sequelize} = require('sequelize')
const session = require('express-session')
// const {filieres, users} = require('./data')
const anneeUniversitaire = require('./views/js/anneeUniversitaire')

const pgSessionStore = require('./model/session')
const sequelize = require('./model/sequelize')

const bodyParser = require('body-parser');

const connRoute = require('./routes/Connexion')
const homeRoute = require('./routes/Home')
const moduleRoute = require('./routes/Modules')
const coursRoute = require('./routes/Cours')
const filiereRoute = require('./routes/Filieres')
const adminRoute = require('./routes/adminDashboard')
const compteRoute = require('./routes/Comptes')
const ajouterFiliereRoute = require('./routes/AjouterFiliere')
const profRoute = require('./routes/profDashboard')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize.sync()



const mySession = {
    name: 'sid',
    password : 'sid',
    resave: false,
    saveUninitialized: false,
    secret:  'hello',
    cookie: {
        maxAge : 1000*60*60*24*7,
        secure: false,
    },
    store: pgSessionStore,
}
app.use(session(
    mySession
))

app.use('/connexion', connRoute)
// app.use('/home', homeRoute)
// app.use('/modules', moduleRoute)
// app.use('/cours', coursRoute)
// app.use('/filieres', filiereRoute)
app.use('/adminDashboard', adminRoute)
app.use('/profDashboard', profRoute)
// app.use('/comptes', compteRoute)
// app.use('/ajouterFiliere', ajouterFiliereRoute)

let currentSchoolYear = null;

// POST route handler to launch a new school year
// app.post('/lancer-annee', (req, res) => {
//   const user = users.find((user) => user.username == req.session.name);
//   const { year, semester } = req.body;
//   const schoolYear = {
//      year: year,
//      semester: semester,
//    };
//   anneeUniversitaire.lancerAnneeUniversitaire(schoolYear.year, schoolYear.semester)
//   currentSchoolYear = anneeUniversitaire.obtenirAnneeUniversitaire();
//   //reset all information concerning l'avancement des cours
//   res.render('adminDashboard', {currentSchoolYear, user})
// });

// app.use(setUser)

// app.use('/api', usersRoute);




// function setUser(req, res, next) {
//     const userId = req.body.userId
//     if(userId){
//         req.user= users.find(user => user.id === userId)
//     }
//     next()
// }
function setFilieres(req, res, next){
    const userId = req.body.id
    if (userId){
        req.filiere = filieres.find(filiere => filiere.userId === userId)
    }
    next()
}

app.use(setFilieres)





app.listen(PORT, ()=> {
    console.log("Server running")
})


module.exports = {
    mySession
}