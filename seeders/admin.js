'use strict';

const Admin = require('../models/admin');
const { encryptPassword } = require('../utils/hashPassword');
const sequelize = require('../config/sequelize');

const seedAdmins = async () => {
    await sequelize.sync();
    const encryptedPassword = encryptPassword('markicob123');
    await Admin.bulkCreate([
        {
            id: 28,
            username: 'markicob',
            password: encryptedPassword
        }
    ]);
    console.log("Seeding completed!");
};

seedAdmins()
    .then(() => sequelize.close())
    .catch((err) => {
        console.error('Error seeding data:', err);
        sequelize.close();
    });