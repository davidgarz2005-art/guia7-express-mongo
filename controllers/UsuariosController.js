
const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        const existe = await Usuario.findOne({ correo });

        if (existe) {
            return res.status(400).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const usuario = new Usuario({
            nombre,
            correo,
            password: passwordEncriptada
        });

        await usuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Iniciar sesión
exports.loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const valido = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!valido) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Consultar usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
