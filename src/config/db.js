const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL conectado exitosamente');
    } catch (error) {
        console.error('Error al conectar la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };