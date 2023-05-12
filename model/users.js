const db = require('./db')

const getUsers = async () => {
    const { rows } = await db.query('SELECT * FROM users');
    return rows;
  };
  
const getUserById = async (id) => {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
};

const revokePermission = async (id, permission) => {
    const {rows} = await db.query('UPDATE users SET permissions = array_remove(permissions, $1) WHERE id = $2 RETURNING *', [permission, id])
    return rows[0];
}

const grantPermission = async(id, permission) =>{
    const {rows} = await db.query('UPDATE users SET permissions = array_append(permissions, $1) WHERE id = $2 RETURNING *', [permission, id])
    return rows[0]
}



  
module.exports = {
    getUsers,
    getUserById,
    revokePermission,
    grantPermission

  };