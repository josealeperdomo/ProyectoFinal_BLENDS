const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const userFind = await userModel.findOne({ email });
        if (!userFind) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        if (!await userModel.comparePassword(password, userFind.password)) {
            return res.status(400).json({ message: 'Datos inválidos' });
        }

        // Generar token JWT
        const token = jwt.sign({
            id: userFind._id,
        }, process.env.SECRET_KEY, {
            expiresIn: '365h' // Tiempo de expiración del token
        });

        // Adjuntar el token en el encabezado de autorización
        res.header('Authorization', token).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verificarToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token no válido' });
        }
        
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.id;

        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no válido en el token' });
        }

        const usuario = await userModel.findById(userId);
        if (usuario) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar el token' });
        console.error('Error al verificar el token:', error);
    }
};

module.exports = { login, verificarToken };



