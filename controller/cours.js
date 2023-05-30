const sequelize = require('../model/sequelize')
const Cours = require('../model/Cours')


const getCoursByIdProf = async (idProf) => {
    try{
        const cours = await Cours.findAll({
            where: {
                fk_cours_users_id : idProf
            }
        });
        return cours;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

const getCoursParModule = async (idmodule) =>{
    try{
        const cours = await Cours.findAll({
            where: {
                fk_cours_modules_id : idmodule
            }
        });
        return cours;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

        
        
        
      

}


  




module.exports = {
    getCoursByIdProf,
    getCoursParModule
}