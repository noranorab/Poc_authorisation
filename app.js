const express = require("express");
const app = express();
const PORT = 6969;
const {Sequelize} = require('sequelize')
const session = require('express-session')

const pgSessionStore = require('./model/session')
const sequelize = require('./model/sequelize')

const bodyParser = require('body-parser');

const connRoute = require('./controller/routes/Connexion')
const homeRoute = require('./controller/routes/Home')
const coursRoute = require('./controller/routes/Cours')
const seanceListRoute = require('./controller/routes/seanceList')
const compteRoute = require('./controller/routes/Comptes')
const profRoute = require('./controller/routes/profDashboard')
const seanceRoute = require('./controller/routes/seance')
const deconnexionRoute = require('./controller/routes/Deconnexion')

// const setVariables = require('./routes/setVariables')
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

// app.use(setVariables)

app.use('/connexion', connRoute)
app.use('/', seanceRoute)
app.use('/' ,seanceListRoute)
app.use('/profDashboard', profRoute)
app.use('/comptes', compteRoute)
app.use('/Deconnexion', deconnexionRoute)



app.listen(PORT, ()=> {
    console.log("Server running")
})


module.exports = {
    mySession, app
}
