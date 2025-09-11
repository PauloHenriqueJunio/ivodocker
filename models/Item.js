const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Fabricante = require('./Fabricante');
const Categoria = require('./Categoria');

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // Adiciona as chaves estrangeiras para as associações
    fabricanteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Fabricante, // Referencia o modelo Fabricante
            key: 'id',
        }
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria, // Referencia o modelo Categoria
            key: 'id',
        }
    },
}, {
    tableName: 'items',
    timestamps: true,
});

// Define as associações
Item.belongsTo(Fabricante, { foreignKey: 'fabricanteId' });
Item.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Fabricante.hasMany(Item, { foreignKey: 'fabricanteId' });
Categoria.hasMany(Item, { foreignKey: 'categoriaId' });

module.exports = Item;