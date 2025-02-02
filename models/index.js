const sequelize = require('../config/sequelize');
const Admin = require('./admin');
const AdminToken = require('./adminToken');

Admin.hasOne(AdminToken, {
    foreignKey: 'id_admin',
    sourceKey: 'id',
    as: 'admin_token'
});

AdminToken.belongsTo(Admin, {
    foreignKey: 'id_admin',
    targetKey: 'id',
    as: 'admin'
});

const db = {
    sequelize,
    Admin,
    AdminToken,
};

module.exports = db;
