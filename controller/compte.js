const sequelize = require('../model/sequelize')
const Compte = require('../model/Compte')

const getCompte = async (username, password) => {
    try{
        const compte = await Compte.findAll({
            where: {
                username : username,
                password: password
            }
        });
        return compte;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

module.exports = {
    getCompte
}