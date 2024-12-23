const swaggerJs = require("swagger-jsdoc");
const swaggerExpress  = require("swagger-ui-express");

const PORT = process.env.PORT || 3001;
const DB_HOST= process.env.DB_HOST || 'localhost';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

const swaggerConfig = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios',
            version: '1.0.0',
            description: 'Documentación de la API con Node.js, Sequelize y JWT',
        },
        servers: [
            {
                url: `${protocol}://${DB_HOST}:${PORT}`,
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocu = swaggerJs(swaggerConfig);

module.exports ={
    swaggerExpress,
    swaggerDocu
}