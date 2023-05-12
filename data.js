const ROLE = {
    ADMIN: 'admin',
    CF: 'coordinateur filieres',
    CM: 'coordinateur modules'
}





module.exports = {
    ROLE: ROLE, 
    users:
    [{
        id: 1,
        username: 'noura.bendani',
        password: '1234',
        role: ROLE.ADMIN
    },
    {
        id: 2,
        username: 'amina.bendani',
        password: '1234',
        role: ROLE.CF
    },
    {
        id: 3,
        username: 'yasmina.bendani',
        password: '1234',
        role: ROLE.CM
    },
    {
        id: 4,
        username: 'ghita.bendani',
        password: '1234',
        role: ROLE.CF
    }

],
    filieres: [
    {
        id_filiere: 1,
        name: 'ASEDS',
        userId: 4
    },
    {
        id_filiere: 2,
        name: 'ICCN',
        userId: 2
    }
],
modules: [
    {
        id_module: 1,
        name: 'Management',
        idUser: 3,
        idFilieres: [1,2]
       
    },
    {
        id_module: 2,
        name: 'Programmation',
        idUser: 3,
        idFilieres: [1,2]
    }
],

 cours: [
     {
        id_cours: 1,
        name: "Introduction à l'entreprise",
        moduleName: "Management"
        
     },
     {
         id_cours: 2,
         name: 'MySQL',
         moduleName: "Programmation"
     },
     {
         id_cours: 3,
         name: 'Java',
         moduleName: "Programmation"

     }
]


}
