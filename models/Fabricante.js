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

// Este arquivo foi removido pois o modelo Fabricante não é mais utilizado no contexto de blog.
module.exports = null; // Exportando null para evitar erros de importação.
