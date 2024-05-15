const userModel = require('../models/users');
const jwt = require('jsonwebtoken');

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
            expiresIn: '1h' // Tiempo de expiración del token
        });

        // Adjuntar el token en el encabezado de autorización
        res.header('Authorization', token).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login };



