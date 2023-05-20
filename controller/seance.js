const sequelize = require('../model/sequelize')
const Seance = require('../model/Seance')

const insertSeance = async (date, hd, hf, obj, rmq, idCours ) => {
    try{
        const seance = await Seance.create({
            date: date,
            heureDebut: hd,
            heureFin: hf,
            objectifs: obj,
            remarques: rmq,
            fk_seance_cours_id: idCours
          });
        console.log('Seance created successfully:', seance);
        return seance;

    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

const getSeanceByCours = async (idCours) => {
    try{
        const seance = await Seance.findAll({
            where: {
                fk_senace_cours_id : idCours
            }
        });
        return seance;
    }catch (error) {
        console.error('an error occured')
        throw error
    }

}

module.exports = {
    insertSeance,
    getSeanceByCours
}