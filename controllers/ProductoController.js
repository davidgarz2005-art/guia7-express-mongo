
const Producto = require('../models/Producto');

// Crear producto
exports.crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            producto
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear producto',
            error: error.message
        });
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener producto por ID
exports.obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto actualizado',
            producto
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Filtrar por categoría
exports.filtrarCategoria = async (req, res) => {
    try {
        const productos = await Producto.find({
            categoria: req.params.cat
        });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
