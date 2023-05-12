const express = require("express");
const app = express();
const PORT = 6969;

const session = require('express-session')
const {filieres} = require('./data')
const pgSessionStore = require('./model/db')

const bodyParser = require('body-parser');
const path = require('path');

const connRoute = require('./routes/Connexion')
const homeRoute = require('./routes/Home')
const moduleRoute = require('./routes/Modules')
const coursRoute = require('./routes/Cours')
const filiereRoute = require('./routes/Filieres')
const adminRoute = require('./routes/adminDashboard')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const mySession = {
    name: 'sid',
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

// app.use(setUser)
app.use('/connexion', connRoute)
app.use('/home', homeRoute)
app.use('/modules', moduleRoute)
app.use('/cours', coursRoute)
app.use('/filieres', filiereRoute)
app.use('/adminDashboard', adminRoute)
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