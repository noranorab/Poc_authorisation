const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize('','','',{
    host:'localhost',
    dialect : 'postgres',
    port:,
    define: {
        timestamps: false
    }
})

//This is used to synchronize Model with the database
//Each change to the model will affect the database (especially the table to which the model is connected)
/*
sequelize.sync({force:true})
*/
module.exports = sequelize;
