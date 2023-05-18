const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

const Module = sequelize.define('Module', {
    idModule: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    fk_module_users_id: {       //cooridnateur de modules
        type: DataTypes.INTEGER,
        references:{
            model:"Prof",
            key:"idProfesseur"
        }
    }
    },
    {
        freezeTableName: true
    }

)

module.exports= {
    Module
}