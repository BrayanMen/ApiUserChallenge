const server = require('./src/server');
const { connectDB, sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 3001;
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const HOST = process.env.NODE_ENV === 'production' 
    ? 'apiuserchallenge.onrender.com' 
    : 'localhost';

connectDB();
sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Servidor funcionando en el puerto ${protocol}://${HOST}:${PORT}`);
    });
});