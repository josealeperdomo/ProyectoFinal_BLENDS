const Pago = require('../models/pago');
const User = require('../models/users')
const fs = require('fs')
const dayjs = require('dayjs');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Cambia el puerto a 587 para una conexión segura (STARTTLS)
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: 'jperdomito0410@gmail.com', // Cuenta de prueba generada
    pass: 'nwestqihtadicifp', // Contraseña de la cuenta de prueba
  },
});

const PagosController = {
  verPagos: async (req, res) => {
    try {
      const pagos = await Pago.find().populate('usuario', 'usuario imagen_perfil');        
      res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
},
  // Función para insertar un nuevo pago
  insertarPago: async (req, res) => {
    try {
      const nuevoPago = new Pago({
        usuario: req.body.usuario,
        monto: req.body.monto,
        fecha_pago: req.body.fecha_pago,
        numero_ref: req.body.numero_ref,
        banco: req.body.banco,
        descripcion: req.body.descripcion,
        metodo_pago: req.body.metodo_pago
      });
      const pagoGuardado = await nuevoPago.save();

      res.status(201).json(pagoGuardado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Función para aceptar un pago (actualizar su estado a 'completado')
  aceptarPago: async (req, res) => {
    try {
      const pagoAceptado = await Pago.findByIdAndUpdate(req.params.id, { estado_pago: 'completado' }, { new: true });
      if (!pagoAceptado) {
        return res.status(404).json({ message: 'No se encontró el pago para aceptar' });
      }
      const usuario = await User.findByIdAndUpdate(pagoAceptado.usuario, {membresia:'premium'})
      const invoiceHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Factura</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-color: #fff;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td colspan="2" style="padding: 20px 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 45px; line-height: 45px; color: #333;">
                      BLENDS
                    </td>
                    <td style="text-align: right;">
                      <p style="margin: 0;">Factura: ${pagoAceptado.id}</p>
                      <p style="margin: 0;">Fecha: ${pagoAceptado.fecha_pago}</p>
                      <p style="margin: 0;">Fecha de recibo: ${dayjs().format('DD-MM-YYYY')}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-bottom: 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="margin: 0;">BLENDS</p>
                      <p style="margin: 0;">Blends 123</p>
                      <p style="margin: 0;">Caracas, Venezuela</p>
                    </td>
                    <td style="text-align: right;">
                      <p style="margin: 0;">Cliente: ${usuario.usuario}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr style="background-color: #eee; border-bottom: 1px solid #ddd; font-weight: bold;">
              <td style="padding: 8px;">Descripción</td>
              <td style="padding: 8px; text-align: right;">Precio</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">Servicio Premium</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$50</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 20px; text-align: center;">
                <p>Ya puede disfrutar de sus características premium.</p>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
      `;
      async function main() {     
        let info = await transporter.sendMail({
          from: "BLENDS 👻", 
          to: "jperdomito0410@gmail.com", 
          subject: "PAGO VERIFICADO CON EXITO",
          html: invoiceHtml, // Cuerpo del mensaje en HTML
        });
      
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      main().catch(console.error);
      res.json(pagoAceptado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Función para rechazar un pago (eliminarlo)
  rechazarPago: async (req, res) => {
    try {
      const pagoEliminado = await Pago.findByIdAndDelete(req.params.id);
      if (!pagoEliminado) {
        return res.status(404).json({ message: 'No se encontró el pago para eliminar' });
      }
      const usuario = await User.findById(pagoEliminado.usuario)
      const rejectionHtml = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>Pago Rechazado</title>
          </head>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-color: #fff;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td colspan="2" style="padding: 20px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 45px; line-height: 45px; color: #333;">
                          BLENDS
                        </td>
                        <td style="text-align: right;">
                          <p style="margin: 0;">Pago: ${pagoEliminado.id}</p>
                          <p style="margin: 0;">Fecha: ${pagoEliminado.fecha_pago}</p>
                          <p style="margin: 0;">Fecha de rechazo: ${dayjs().format('DD-MM-YYYY')}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-bottom: 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin: 0;">BLENDS</p>
                          <p style="margin: 0;">Blends 123</p>
                          <p style="margin: 0;">Caracas, Venezuela</p>
                        </td>
                        <td style="text-align: right;">
                          <p style="margin: 0;">Cliente: ${usuario.usuario}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr style="background-color: #eee; border-bottom: 1px solid #ddd; font-weight: bold;">
                  <td colspan="2" style="padding: 8px; text-align: center;">
                    <p>Pago Rechazado</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px; border-bottom: 1px solid #eee;">
                    Lamentamos informarle que su pago ha sido rechazado. Por favor, intente nuevamente o contacte a su banco para obtener más información.
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 20px; text-align: center;">
                    <p>Si tiene alguna pregunta, no dude en contactarnos.</p>
                    <p>Gracias por su comprensión.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
          </html>
          `;
      async function main() {     
        let info = await transporter.sendMail({
          from: "BLENDS 👻", 
          to: "jperdomito0410@gmail.com", 
          subject: "PAGO RECHAZADO",
          html: rejectionHtml, // Cuerpo del mensaje en HTML
        });
      
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      main().catch(console.error);
      res.json({ message: 'Pago eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = PagosController;

