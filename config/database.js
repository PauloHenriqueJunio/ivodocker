const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carrega no .env as variaveis de ambiente
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // true para ver os logs do SQL
    }
);

module.exports = sequelize;