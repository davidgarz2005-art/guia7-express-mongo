
const express = require('express');
const router = express.Router();

const ProductoController = require('../controllers/ProductoController');

// 1. Crear producto
router.post('/', ProductoController.crearProducto);

// 2. Obtener todos los productos
router.get('/', ProductoController.obtenerProductos);

// 6. Filtrar por categoría
router.get('/categoria/:cat', ProductoController.filtrarCategoria);

// 3. Obtener producto por ID
router.get('/:id', ProductoController.obtenerProducto);

// 4. Actualizar producto
router.put('/:id', ProductoController.actualizarProducto);

// 5. Eliminar producto
router.delete('/:id', ProductoController.eliminarProducto);

module.exports = router;
