
const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/UsuariosController');

// 7. Registrar usuario
router.post('/registro', UsuariosController.registrarUsuario);

// 8. Iniciar sesión
router.post('/login', UsuariosController.loginUsuario);

// 9. Consultar usuarios
router.get('/', UsuariosController.obtenerUsuarios);

module.exports = router;
