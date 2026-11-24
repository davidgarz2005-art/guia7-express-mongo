
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuarios');

// Obtener estadísticas generales
exports.obtenerEstadisticas = async (req, res) => {
    try {
        const totalProductos = await Producto.countDocuments();

        const totalUsuarios = await Usuario.countDocuments();

        const productosPorCategoria = await Producto.aggregate([
            {
                $group: {
                    _id: '$categoria',
                    cantidad: { $sum: 1 }
                }
            }
        ]);

        const totalStock = await Producto.aggregate([
            {
                $group: {
                    _id: null,
                    cantidad: { $sum: '$stock' }
                }
            }
        ]);

        res.json({
            mensaje: 'Estadísticas obtenidas correctamente',
            totalProductos,
            totalUsuarios,
            totalStock: totalStock.length > 0
                ? totalStock[0].cantidad
                : 0,
            productosPorCategoria
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener estadísticas',
            error: error.message
        });
    }
};
