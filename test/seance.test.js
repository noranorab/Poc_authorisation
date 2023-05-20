const { expect } = require('chai');
const request = require('supertest');
const {insertSeance} = require('../controller/seance');
const app = require('../app')
const { describe } = require('mocha');
// Importez les autres dépendances nécessaires

describe('insertSeance', () => {
  it('should insert a new seance', async () => {
    // Définissez les valeurs d'exemple pour les paramètres de la fonction
    const date = '2023-05-20';
    const heureDebut = '09:00:00';
    const heureFin = '10:30:00';
    const objectifs = 'Objectifs de la séance';
    const remarques = 'Remarques optionnelles';
    const coursId = 1;

    // Appelez la fonction insertSeance
    const seance = await insertSeance(date, heureDebut, heureFin, objectifs, remarques, coursId);

    // Ajoutez vos assertions pour vérifier le comportement de la fonction
    expect(seance).to.exist;
    expect(seance.date).to.equal(date);
    expect(seance.heureDebut).to.equal(heureDebut);
    expect(seance.heureFin).to.equal(heureFin);
    // Ajoutez d'autres assertions selon votre logique de création de séance
  });
});

