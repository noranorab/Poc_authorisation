const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

//Here I define the table of Prof

const Prof = sequelize.define('users',{
    idprofesseur:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    role:{
        type:DataTypes.STRING //admin || CF ||CM||prof
    },
    nom:{
        type:DataTypes.STRING
    },
    prenom:{
        type:DataTypes.STRING
    }
    },
    {
        freezeTableName:true
    }
)


module.exports= 
    Prof;
