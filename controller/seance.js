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

module.exports = {
    insertSeance,
    getSeanceByCours
}