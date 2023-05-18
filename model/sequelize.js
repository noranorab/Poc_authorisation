const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize('follow_up','postgres','postgres',{
    host:'localhost',
    dialect : 'postgres',
    port:5432,
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