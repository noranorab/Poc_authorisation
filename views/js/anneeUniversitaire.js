let anneeUniversitaireData = null;

function lancerAnneeUniversitaire(year = '2022/2023', semester='1') {
  anneeUniversitaireData = {
    year : year,
    semester: semester
    
  };
}

function obtenirAnneeUniversitaire() {
  return anneeUniversitaireData;
}



module.exports = {
  lancerAnneeUniversitaire,
  obtenirAnneeUniversitaire,
};

