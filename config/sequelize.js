const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    {
    database: 'gmedia_democase',
    username: 'gmedia_democase2',
    password: 'Janglidalam29J',
    host: 'gmedia.bz',
    dialect: 'mysql',
    port: 3306,
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;