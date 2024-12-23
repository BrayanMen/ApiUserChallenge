const swaggerJs = require("swagger-jsdoc");
const swaggerExpress  = require("swagger-ui-express");

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
                url: 'http://localhost:3001',
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