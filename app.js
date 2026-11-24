
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarBD = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Guia 7 funcionando correctamente'
    });
});

// Importar rutas
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const reportesRoutes = require('./routes/reportes');

// Registrar rutas
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reportes', reportesRoutes);

// Iniciar servidor después de conectar MongoDB
const iniciarServidor = async () => {
    try {
        await conectarBD();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log('Servidor corriendo en el puerto ' + PORT);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error.message);
        process.exit(1);
    }
};

iniciarServidor();
