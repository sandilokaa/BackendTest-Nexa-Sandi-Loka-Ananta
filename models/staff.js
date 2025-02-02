const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Karyawan extends Model {}

Karyawan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        nip: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gend: {
            type: DataTypes.ENUM('L', 'P'),
            allowNull: false,
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tgl_lahir: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        insert_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        insert_by: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        update_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        update_by: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Karyawan',
        tableName: 'karyawan',
        timestamps: false,
    }
);

module.exports = Karyawan;
