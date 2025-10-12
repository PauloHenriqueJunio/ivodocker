const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comentario = sequelize.define('Comentario', {
    texto: { 
        type: DataTypes.TEXT,
        allowNull: false
     },

}, {
    tableName: 'comentarios',
});
module.exports = Comentario;

// const Post = require('./Post');
// const Usuario = require('./Usuario');

// const Comentario = sequelize.define('Comentario', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     conteudo: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     postId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Post,
//             key: 'id',
//         }
//     },
//     usuarioId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Usuario,
//             key: 'id',
//         }
//     },
// }, {
//     tableName: 'comentarios',
//     timestamps: true,
// });

// module.exports = Comentario;
