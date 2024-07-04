import mercadopage from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";
import { obtenerFechaHoraActual, calcularFechaVencimiento } from "../utilidades/dateUtils.js";
import { addNewMembresiaUsuario, updateMembresiaUsuarioById, getMembresiaUsuarioByUserIdAndType } from "./membresiasUsuarios.controller.js"
import { addNewHistorialMembresia, getHistorialMembresiaByUserIdAndType, getHistorialMembresiaByUserIdAndTypeAndOperacionId } from "./historialMembresias.controller.js"
import { crearQRMembresia } from "./QR.controller.js"

const userData = require('../utilidades/mercadoPagoProductos.js');

export const createOrder = async (req, res) => {
  const { ID_usuario, total } = req.body;
  console.log(" req.body",  req.body)
  userData.setUserData(ID_usuario, total);

  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          title: nombre,
          description: descripcion,
          unit_price: costo,
          currency_id: "MXN",
          quantity: 1,
        },
      ],
      notification_url: "https://a263-200-71-109-54.ngrok-free.app/api/webhook",
      back_urls: {
        success: "http://localhost:4000/success",
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    });

    // console.log("result", result);
    // console.log("result.BODY", result.body);
    // res.json({ message: "Payment creted" });
    // res.json(result.body);
    res.send(result.body)
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {

  try {
    const datosCompra = userData.getUserData();
    console.log("datosCompra", datosCompra)
    // console.log("Datos que se pasan como parámetros a getHistorialMembresiaByUserIdAndType:");
    // console.log("userID:", userID);
    // console.log("tipoMembresiaID:", tipoMembresiaID);
    const payment = req.query;
    console.log("payment", payment)
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);

      const fechaHoraActual = await obtenerFechaHoraActual();
      const fechaVencimiento = await calcularFechaVencimiento();

      const existingHistorialMembresiaOperacionId = await getHistorialMembresiaByUserIdAndTypeAndOperacionId(datosCompra.userID, datosCompra.tipoMembresiaID, data.response.id);
      if (existingHistorialMembresiaOperacionId) {
        console.log("existe, actualizando", existingHistorialMembresiaOperacionId.operacion_id)
      } else {
        console.log("Insertando")
        const responseHistorialMembresia = await addNewHistorialMembresia({
          body: {
            ID_usuario: datosCompra.userID,
            ID_tipoMembresia: datosCompra.tipoMembresiaID,
            fechaInicio: fechaHoraActual,
            fechaVencimiento: fechaVencimiento,
            precio: data.response.transaction_details.total_paid_amount,
            operacion_id: data.response.id,
            operacion_status: data.response.status,
            operacion_status_detail: data.response.status_detail,
            operacion_description: data.response.description,
            operacion_total_paid_amount: data.response.transaction_details.total_paid_amount
          }
        });
        
      }



      // Verificar si ya existe un registro en MembresiasUsuarios para el usuario y el tipo de membresía
      const existingMembresiaUsuario = await getMembresiaUsuarioByUserIdAndType(datosCompra.userID, datosCompra.tipoMembresiaID);


      if (existingMembresiaUsuario) {
        // Si ya existe un registro, actualizar el registro existente
        const responseUpdateMembresiaUsuario = await updateMembresiaUsuarioById({
          params: { id: existingMembresiaUsuario.ID_membresiaUsuario },
          body: {
            ID_usuario: datosCompra.userID,
            ID_tipoMembresia: datosCompra.tipoMembresiaID,
            fechaInicio: fechaHoraActual,
            fechaVencimiento: fechaVencimiento,
            imagenUrl: existingMembresiaUsuario.imagenUrl
            // imagenUrl: "existingMembresiaUsuario.imagenUrl"
          }
        });
      } else {
        const responseCrearQRMembresiaImagenUrl = await crearQRMembresia({
          body: {
            ID_usuario: datosCompra.userID,
            fechaInicio: fechaHoraActual,
            fechaVencimiento: fechaVencimiento,
            ID_tipoMembresia: datosCompra.tipoMembresiaID,
            email: datosCompra.correo
          }
        });
  
        console.log("responseCrearQRMembresiamagenUrl", responseCrearQRMembresiaImagenUrl);
        // Si no existe un registro, insertar en MembresiasUsuarios
        const responseMembresiaUsuario = await addNewMembresiaUsuario({
          body: {
            ID_usuario: datosCompra.userID,
            ID_tipoMembresia: datosCompra.tipoMembresiaID,
            fechaInicio: fechaHoraActual,
            fechaVencimiento: fechaVencimiento,
            imagenUrl: responseCrearQRMembresiaImagenUrl
            // imagenUrl: "responseCrearQRMembresiaImagenUrl"
          }
        });

      }
    }

    console.log("compra finalizada...")
    res.status(200).json({ msg: 'Compra finalizada...' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
