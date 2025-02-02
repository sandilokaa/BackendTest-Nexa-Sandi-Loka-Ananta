const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class AdminToken extends Model {}

AdminToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expired_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'AdminToken',
        tableName: 'admin_token',
        timestamps: false,
    }
);

module.exports = AdminToken;