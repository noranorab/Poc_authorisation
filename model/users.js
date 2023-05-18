// const _pgPool = require('./db');


// const getUser = async (idUser) => {
//     const {rows} = await _pgPool.query('select * from users where idProfesseur = $1', [idUser])
//     console.log('hello from getUser', rows[0])
//     return [rows[0].idprofesseur, rows[0].nom, rows[0].prenom, rows[0].role];
// }

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




// const revokePermission = async (id, permission) => {
//     const {rows} = await db.query('UPDATE users SET permissions = array_remove(permissions, $1) WHERE id = $2 RETURNING *', [permission, id])
//     return rows[0];
// }

// const grantPermission = async(id, permission) =>{
//     const {rows} = await db.query('UPDATE users SET permissions = array_append(permissions, $1) WHERE id = $2 RETURNING *', [permission, id])
//     return rows[0]
// }



  
// module.exports = {
//     updateUser,
//     getUser,
//     getUserByName,
//     insertUser,
//     getUser,
//     revokePermission,
//     grantPermission

//   };