const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

//Here I define the table of Notes

const Note = sequelize.define('Note',{
    idNote:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Seance:{
        type:DataTypes.INTEGER
    },
    Note:{
        type:DataTypes.STRING //La note de professeur
    }, 
    anneeUniversitaire:{
        type:DataTypes.INTEGER //La note de professeur
    },   
    idProf:{                        //le prof qui a réaliser la note
        type:DataTypes.INTEGER,
        references:{
            model:"Prof",
            key:"idProfesseur"
        }
    },
    idCours:{                        //le cours où la note s'inscrit
        type:DataTypes.INTEGER,
        references:{
            model:"Cours",
            key:"idCours"
        }
    },
    },
    {
        freezeTableName:true
    }
)

module.exports= {
    Note
}