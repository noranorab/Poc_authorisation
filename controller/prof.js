const sequelize = require('../model/sequelize')
const Prof = require('../model/Prof')


const getProf = async (idProf) => {
    try{
        const prof = await Prof.findAll({
            where: {
                idprofesseur : idProf
            }
        });
        return prof;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

const updateProf = async (idprofesseur, nom, prenom, role) =>{
    try{
        const prof = await Prof.findByPk(idprofesseur)

        const updatedProf = {idprofesseur, nom, prenom, role}
        console.log(updatedProf)

        const result = await Prof.update(updatedProf, {
            where : {
                idprofesseur : idprofesseur
            }
        })
        console.log(updatedProf)

        return result
    }catch(error){
        throw error
    }
}


// const getUserByName = async (name) => {
//   const {rows} = await _pgPool.query('select * from users where nom = $1', [name])
//   console.log('from getUserbyusername', rows[0])
//   return [rows[0].idprofesseur, rows[0].nom, rows[0].prenom, rows[0].role];
// }


// const insertUser = async (nom, prenom, role) => {
//     const query = 'INSERT INTO users (name, surname, role) VALUES ($1, $2, $3) RETURNING id';
//     const values = [nom, prenom, role];
  
//     try {
//       const result = await _pgPool.query(query, values);
//       const insertedId = result.rows[0].id;
//       console.log(`User inserted with ID: ${insertedId}`);
//     } catch (error) {
//       console.error('Error inserting user:', error);
//     } finally {
//       await _pgPool.end();
//     }
// }
// const updateUser = async (nom, prenom, role, id) => {
//   const [idUser,,,] = await getUser(id)
//   try {
//     const query = `
//       UPDATE users
//       SET nom = $1, prenom = $2, role = $3 
//       WHERE idProfesseur = ${idUser}
//     `;

//     const values = [nom, prenom, role];
//     const result = await _pgPool.query(query, values);
//     console.log(result.rowCount)

//     return result.rowCount; // Number of rows affected by the update query
//   } catch (error) {
//     console.error('Failed to update user profile:', error);
//     throw error;
//   }
// }


module.exports =
{
    getProf, updateProf
}
