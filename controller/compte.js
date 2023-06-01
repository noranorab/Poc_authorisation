const sequelize = require('../model/sequelize')
const Compte = require('../model/Compte');

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
const getCompteByUsername = async (username) => {
    try{

        const compte = await Compte.findAll({
            where: {
                username : username,
            }
        });
        console.log(compte)
        return compte;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

const updateCompte = async (idcompte, username, password, id) =>{
    try{
        // const compte = await Compte.findByPk(idcompte);

        const updatedCompte = {username, password, id, idcompte}
        console.log(updatedCompte)
        const result = await Compte.update(updatedCompte, {
            where : {
                idcompte : idcompte
            }
        })

        console.log('result ' ,result)
        return result
    }catch(error){
        throw error
    }
}

const updatePassword = async (newpassword, idcompte) => {
    try {
        const compte = await Compte.findByPk(idcompte);
        console.log(compte)

        if (!compte) {
            throw new Error('Account not found');
        }

        const result = await Compte.update({
            password: newpassword
        }, {
            where : {
            idcompte : idcompte
        }});

        console.log('result', result);
        return result;
    } catch (error) {
        throw error;
    }

}
module.exports = {
    getCompte, updateCompte, updatePassword, getCompteByUsername
}