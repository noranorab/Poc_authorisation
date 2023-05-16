const _pgPool = require('./db');
const {getUser} = require('./users')


const getAccountUser = async (username, password) => {
    const {rows} = await _pgPool.query('select * from compte where username = $1 and password = $2', [username, password])
    if (rows.length === 0) {
        throw new Error('Invalid username or password');
    }
    console.log('hello from getAccoutnUser', rows[0])
    return rows[0];
}

const updateAccount = async (username, password, id) => {
    const [idUser,,,] = await getUser(id)
    try {
      const query = `
        UPDATE compte
        SET username = $1, password = $2
        WHERE fk_compte_users_id = ${idUser}
      `;
  
      const values = [username, password];
      const result = await _pgPool.query(query, values);
      console.log(result.rowCount)
  
      return result.rowCount; // Number of rows affected by the update query
    } catch (error) {
      console.error('Failed to update account:', error);
      throw error;
    }
  }

module.exports = {
    getAccountUser, 
    updateAccount
}
