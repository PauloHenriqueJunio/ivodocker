const sequelize = require('../config/database');
const Item = require('./Item');
const Categoria = require('./Categoria');
const Fabricante = require('./Fabricante');
const Usuario = require('./Usuario');

// Define as associações entre os modelos
// Item e Categoria: um item pertence a uma categoria
Item.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Item, { foreignKey: 'categoriaId' });

// Item e Fabricante: um item pertence a um fabricante
Item.belongsTo(Fabricante, { foreignKey: 'fabricanteId' });
Fabricante.hasMany(Item, { foreignKey: 'fabricanteId' });

// Exporta todos os modelos para serem usados em outros arquivos
module.exports = {
    sequelize,
    Item,
    Categoria,
    Fabricante,
    Usuario
};