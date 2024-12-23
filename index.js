const server = require('./src/server');
const { connectDB, sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 3001;

connectDB();
sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Servidor funcionando en el puerto ${PORT}`);
    });
});