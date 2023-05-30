const sequelize = require('../model/sequelize')
const Filiere = require('../model/Filiere');

const getFiliereByIdProf = async (idProf) => {
    try{
        const filiere = await Filiere.findAll({
            where: {
                fk_filiere_users_id : idProf
            }
        });
        console.log(filiere)
        return filiere;

    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

module.exports = {
    getFiliereByIdProf
}