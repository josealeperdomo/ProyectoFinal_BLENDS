const userModel = require('../models/users')
const codeModel = require('../models/codigoverficacion')
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Cambia el puerto a 587 para una conexión segura (STARTTLS)
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: 'jperdomito0410@gmail.com', // Cuenta de prueba generada
      pass: 'nwestqihtadicifp', // Contraseña de la cuenta de prueba
    },
  });

const verificarCorreo = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'El campo de correo electrónico es requerido' });
        }

        const usuario = await userModel.findOne({ email });

        if (usuario) {
            const codigo = uuidv4();
            const codigoDB = codeModel.create({id_usuario: usuario._id, codigo})
            const contenidoCorreo = `<!DOCTYPE html>
            <html lang="es">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recuperación de Contraseña</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
            
                    h2 {
                        color: #333;
                    }
            
                    p {
                        color: #666;
                    }
            
                    .code {
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #f0f0f0;
                        border-radius: 5px;
                        font-size: 20px;
                        text-align: center;
                    }
            
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                    }
            
                    .footer p {
                        color: #999;
                    }
            
                    @media screen and (max-width: 600px) {
                        .container {
                            padding: 10px;
                        }
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <h2>Recuperación de Contraseña</h2>
                    <p>¡Hola!</p>
                    <p>Has solicitado recuperar tu contraseña. Utiliza el siguiente código para completar el proceso:</p>
                    <div class="code">
                        ${codigo}
                    </div>
                    <p>Si no has solicitado esta recuperación, ignora este correo.</p>
                    <div class="footer">
                        <p>Este correo fue generado automáticamente. Por favor, no respondas a este mensaje.</p>
                    </div>
                </div>
            </body>
            
            </html>`
            async function main() {     
                let info = await transporter.sendMail({
                  from: "BLENDS 👻", 
                  to: usuario.email, 
                  subject: "CODIGO PARA RECUPERAR CONTRASEÑA",
                  html: contenidoCorreo, // Cuerpo del mensaje en HTML
                });
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              }
            main().catch(console.error);
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar el correo' });
        console.error('Error al verificar el correo:', error);
    }
};

const verificarCodigo = async (req, res) =>{
    try {
        const { codigo } = req.body;

        if (!codigo) {
            return res.status(400).json({ message: 'El campo de codigo es requerido' });
        }

        const codigoDB = await codeModel.findOne({ codigo });

        if (codigoDB) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar el codigo' });
        console.error('Error al verificar el codigo:', error);
    }
}

const cambiarPassword = async (req, res) => {
    const codigo = req.params.id;
    try {
        const codigoDB = await codeModel.findOne({ codigo });
        if (!codigoDB) {
            return res.status(404).json({ error: 'Código de verificación no encontrado' });
        }
        
        const idUsuario = codigoDB.id_usuario;

        const { nuevaContrasena, nuevaContrasena2 } = req.body;
        
        const contrasenaCoincide = nuevaContrasena === nuevaContrasena2;
        if (!contrasenaCoincide) {
            return res.status(400).json({ error: 'Las contraseñas no coinciden' });
        }
        
        if (!nuevaContrasena) {
            return res.status(400).json({ error: 'La nueva contraseña no puede estar vacía' });
        }

        const nuevaContrasenaEncriptada = await userModel.encryptPassword(nuevaContrasena);
        
        const usuario = await userModel.findById(idUsuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        usuario.password = nuevaContrasenaEncriptada;
        await usuario.save();
        
        await codeModel.findOneAndDelete({ codigo });
        
        return res.status(200).json({ mensaje: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {verificarCorreo, verificarCodigo,cambiarPassword}