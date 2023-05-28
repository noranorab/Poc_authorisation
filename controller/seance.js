const sequelize = require('../model/sequelize')
const Seance = require('../model/Seance')

const insertSeance = async (date, hd, hf, obj, rmq, idCours, numero ) => {
    try{
        const seance = await Seance.create({
            date: date,
            heuredebut: hd,
            heurefin: hf,
            objectifs: obj,
            remarques: rmq,
            fk_seance_cours_id: idCours,
            numero: numero
          });
        console.log('Seance created successfully:', seance);
        return seance;

    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

const updateSeance = async (id, {date, hd, hf, obj, rmq, numero}) => {
    const updatedSeance = {date, hd, hf, obj, rmq, numero}
    try{
        const result = await Seance.update(updatedSeance, {
            where : {
                idseance : id
            }
        })
        return result
    }catch(error){
        throw error
    }
}

const getSeanceByCours = async (idcours) => {
    try{
        const seance = await Seance.findAll({
            where: {
                fk_seance_cours_id : idcours
            }
        });
        return seance;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

const deleteSeanceById = async (id ) =>{
    try{
        const seance = await Seance.findByPk(id)
        if (!seance) {
            // Seance not found
            return { success: false, message: 'Seance not found' };
        }
      
          // Delete the seance
        await seance.destroy();
      
          // Seance successfully deleted
        return { success: true, message: 'Seance deleted successfully' };
    } catch (error) {
        console.error(error);
          // Handle the error
        return { success: false, message: 'Failed to delete seance' };
    }
} 

module.exports = {
    insertSeance,
    getSeanceByCours,
    updateSeance,
    deleteSeanceById
}