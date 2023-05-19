const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

//Here I define the table of Prof

const Cours = sequelize.define('cours',{
    idcours:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nom:{
        type:DataTypes.STRING
    },
    description: {
        type:DataTypes.STRING
    },
    fk_cours_users_id:{                        //This is to show the prof that is responsible for a lesson
        type:DataTypes.INTEGER,
        references:{
            model:"Prof",
            key:"idprofesseur"
        }
    },
    fk_cours_modules_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"Module",
            key:"idModule"
        }
    }
    },
    {
        freezeTableName:true
    }
)

module.exports= Cours;