const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Admin extends Model {}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Admin',
        tableName: 'admin',
        timestamps: false,
    }
);

module.exports = Admin;
