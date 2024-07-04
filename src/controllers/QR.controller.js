import { subirImagenQR } from "../controllers/cloudinary.controller";
import { sendQRByEmail } from "../controllers/email.controller";
const qr = require('qrcode');
import fs from 'fs';
import path from 'path';

// Método para generar el código QR
export const crearQRMembresia = async (req, res) => {

  // console.log("req.body", req.body)
  const {
    ID_usuario,
    ID_tipoMembresia,
    fechaInicio,
    fechaVencimiento,
    email
  } = req.body;
  
  // Construir la cadena de texto con la información
  const userData = JSON.stringify({
    ID_usuario: ID_usuario,
    fechaInicio: fechaInicio,
    fechaVencimiento: fechaVencimiento,
    ID_tipoMembresia: ID_tipoMembresia
  });

  try {
    // Generar el código QR y guardarlo localmente
    // await qr.toFile('./qr_code.png', userData);
    // Generar el código QR y obtener los datos de la imagen en formato base64
    const qrDataURL = await qr.toDataURL(userData);
    // console.log("qrDataURL", qrDataURL);
    // Llamar al controlador de Cloudinary para subir la imagen
    const imageUrl  = await subirImagenQR({ file: { data: qrDataURL } }, fechaInicio);

    // Enviar el QR por correo electrónico al usuario
    await sendQRByEmail(qrDataURL, email, fechaInicio);

    // Envía una respuesta de éxito
    console.log('Código QR generado y guardado exitosamente')
    return imageUrl;
    // res.status(200).json({ message: 'Código QR generado y guardado exitosamente' });
  } catch (error) {
    console.error('Error al generar el código QR:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
