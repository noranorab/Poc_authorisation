const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

//Here I define the table of Prof

const Seance = sequelize.define('seance', {
    idseance: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
    },
    heuredebut: {
      type: DataTypes.TIME,
    },
    heurefin: {
      type: DataTypes.TIME,
    },
    objectifs: {
      type: DataTypes.TEXT,
    },
    remarques: {
      type: DataTypes.TEXT
    },
    fk_seance_cours_id: {       //cooridnateur de modules
        type: DataTypes.INTEGER,
        references:{
            model:"Cours",
            key:"idcours"
        }
    }
    },
    {
        freezeTableName:true
    }
)

module.exports= Seance;