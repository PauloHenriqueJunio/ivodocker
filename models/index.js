const sequelize = require('../config/database');
const Post = require('./Post');
const Categoria = require('./Categoria');
const Usuario = require('./Usuario');
const Comentario = require('./Comentario');

// Associações para Blog
Post.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Post, { foreignKey: 'categoriaId' });

Post.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Post, { foreignKey: 'usuarioId' });

// Associações para Comentário
Comentario.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comentario, { foreignKey: 'postId' });

Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });

module.exports = {
    sequelize,
    Post,
    Categoria,
    Usuario,
    Comentario
};