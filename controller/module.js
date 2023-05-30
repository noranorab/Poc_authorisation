const sequelize = require('../model/sequelize')
const Module = require('../model/Module');

const getModuleByIdFiliere = async (id) => {
    try{
        const modules = await Module.findAll({
            where: {
                idfiliere : id
            }
        });
        return modules;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

module.exports = {
    getModuleByIdFiliere 
}