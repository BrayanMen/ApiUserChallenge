require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { swaggerDocu, swaggerExpress } = require('./config/swagger')
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/index');
const server = express();

const PORT = process.env.PORT || 3001;
const DB_HOST = process.env.DB_HOST || 'localhost';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

// Middlewares
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configurar CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${protocol}://${DB_HOST}:${PORT}`);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Ruta Swagger
server.use('/api-docu', swaggerExpress.serve, swaggerExpress.setup(swaggerDocu));

// Rutas
server.use('/', routes);
app.get('/', (req, res) => {
    res.json({ message: 'API funciona correcatmente hacer pruebas en https://apiuserchallenge.onrender.com/api-docu' });
});

// Middleware de errores
server.use(errorHandler);

module.exports = server;