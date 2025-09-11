const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fabricante = sequelize.define('Fabricante', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'fabricantes',
    timestamps: true,
});

module.exports = Fabricante;
