const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

//Here I define the table of Prof

const Seance = sequelize.define('seance', {
    idSeance: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    heureDebut: {
      type: DataTypes.TIME,
      allowNull: false
    },
    heureFin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    objectifs: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    remarques: {
      type: DataTypes.TEXT
    },
    fk_seance_cours_id: {       //cooridnateur de modules
        type: DataTypes.INTEGER,
        references:{
            model:"Cours",
            key:"idCours"
        }
    }
    },
    {
        freezeTableName:true
    }
)

module.exports= Seance;