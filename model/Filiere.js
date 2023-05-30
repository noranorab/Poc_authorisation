const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./sequelize');

const Filiere = sequelize.define('filiere', {
    idfiliere: {
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
    fk_filiere_users_id: {
        type: DataTypes.INTEGER,
        references:{
            model:"Prof",
            key:"idprofesseur"
        }
    }
    },
    {
        freezeTableName: true
    }

)

module.exports= Filiere







// const _pgPool = require('./db');


// const insertFiliere = async (nom, description, userId) => {
//     const query = 'INSERT INTO filiere (nom, description, fk_filiere_users_id) VALUES ($1, $2, $3)';
//     const values = [nom, description, userId];
//     try {
//         const result = await _pgPool.query(query, values);
//         res.status(200).send('La matière a été ajoutée avec succès.');
//     }catch(error){
//         console.error('Erreur lors de l\'exécution de la requête.', error);
//     }finally{
//         await _pgPool.end();
//     }
// }

// module.exports = {
//     insertFiliere
// }