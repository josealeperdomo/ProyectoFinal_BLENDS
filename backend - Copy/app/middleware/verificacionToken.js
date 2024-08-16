const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']; // Va a contener el token

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userFind = await userModel.findById(decoded.id);
        if (!userFind) return res.status(404).json({ message: 'User not found' });
        req.user = userFind; // Agregar el usuario decodificado al objeto de solicitud para usarlo en las rutas protegidas
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { verifyToken };
