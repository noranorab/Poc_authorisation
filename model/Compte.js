const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

//Here I define the table of Comptes

const Compte = sequelize.define('compte',{
    username:{
        type:DataTypes.STRING,
        unique:true,
        primaryKey:true,
        get(){return this.getDataValue("username")}
    },
    password:{
        type:DataTypes.STRING
    },
    fk_compte_users_id:{                        //le professeur possédant le compte
        type:DataTypes.INTEGER,
        references:{
            model:"Prof",
            key:"idprofesseur"
        }
    },
    idcompte:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
    },
    {
        freezeTableName:true
    }
)

module.exports =  Compte;