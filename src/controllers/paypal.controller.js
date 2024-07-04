
// import {
//   PAYPAL_API,
//   HOST,
//   PAYPAL_API_CLIENT,
//   PAYPAL_API_SECRET,
// } from "../config.js";

// import { obtenerFechaHoraActual, calcularFechaVencimiento } from "../utilidades/dateUtils.js";
// import { addNewOrdenPedido } from "./ordenesPedidos.controller.js"
// import { addNewDetallePedido } from "./detallesPedido.controller.js"
// import { getItemsOrderByUserID, deleteItemsByUserID } from "./carritoCompras.controller.js"

// import { addNewMembresiaUsuario, updateMembresiaUsuarioByIdActualizar} from "./membresiasUsuarios.controller.js"
// import { addNewHistorialMembresia } from "./historialMembresias.controller.js"
// import { crearQRMembresia } from "./QR.controller.js"

// import { updateItemQuantityByID_Orden } from "./products.controller.js";

// const userData = require('../utilidades/paypal_payment.js');
// const membresiaData = require('../utilidades/membresias_payment.js');


// import axios from 'axios';
// // const axios = require('axios');


// export const createOrder = async (req, res) => {
//   const { ID_usuario, total, currentURL, ID_direccion } = req.body;
//   userData.setUserData(ID_usuario, total, currentURL, ID_direccion);
//   try {

//     const itemsResponse = await axios.get(`${HOST}/api/carrito-compras-ID-usuario/${ID_usuario}`);
//     const carritoItems = itemsResponse.data;

//     const items = carritoItems.map((item) => ({
//       name: item.nombre,
//       unit_amount: { currency_code: "MXN", value: item.precioFinal },
//       quantity: item.cantidad.toString(),
//     }));

//     const order = {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "MXN",
//             value: total,
//             breakdown: {
//               item_total: { currency_code: "MXN", value: total }, // Suma de los precios de los artículos
//             }
//           },
//           items: items,
//         }
//       ],
//       application_context: {
//         brand_name: "mycompany.com",
//         landing_page: "NO_PREFERENCE",
//         user_action: "PAY_NOW",
//         return_url: `${HOST}/api/capture-order`,
//         cancel_url: `${HOST}/api/cancel-payment`,
//       },
//     };

//     // format the body
//     const params = new URLSearchParams();
//     params.append("grant_type", "client_credentials");

//     // Generate an access token
//     const {
//       data: { access_token },
//     } = await axios.post(
//       "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     // console.log(access_token);

//     // make a request
//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders`,
//       order,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     // console.log(response.data);

//     return res.json(response.data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Something goes wrong");
//   }
// };

// export const captureOrder = async (req, res) => {
//   const { token } = req.query;

//   try {

//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
//       {},
//       {
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     // console.log("CAPTURE ORDER", response.data);

//     if (response.data.status === 'COMPLETED') {
//       const datosCompra = userData.getUserData();
//       const fechaHoraActual = await obtenerFechaHoraActual();

//       const ID_pedido = await addNewOrdenPedido({
//         body: {
//           ID_usuario: datosCompra.userID,
//           fecha: fechaHoraActual,
//           total: datosCompra.total,
//           operacion_id: response.data.id,
//           operacion_status: response.data.status,
//           ID_direccion: datosCompra.ID_direccion
//         }
//       });

//       // console.log("ID_pedido:", ID_pedido);

//       try {
//         const items = await getItemsOrderByUserID(datosCompra.userID);

//         for (const item of items) {
//           const { ID_producto, cantidad, precioFinal } = item;

//           await addNewDetallePedido({
//             body: {
//               ID_pedido: ID_pedido,
//               ID_producto,
//               cantidad,
//               precioUnitario: precioFinal
//             }
//           });

//           await updateItemQuantityByID_Orden({
//             body: {
//               ID_producto,
//               cantidad
//             }
//           });
//           // console.log(ID_producto, cantidad, precioFinal)
//           // console.log("Detalle de pedido añadido correctamente para el producto con ID", ID_producto);
//         }
//         // console.log("Detalles de pedido añadidos correctamente");
//         // res.status(200).json({ msg: "Detalles de pedido añadidos correctamente" });
//       } catch (error) {
//         console.error("Error al agregar detalles de pedido:", error.message);
//         res.status(500).json({ msg: "Error al agregar detalles de pedido" });
//       }

//       try {

//         await deleteItemsByUserID(datosCompra.userID);

//         console.log("Carrito eliminado correctamente");
//         // res.status(200).json({ msg: "Detalles de pedido añadidos correctamente" });
//       } catch (error) {
//         console.error("Error al eliminar el carrito:", error.message);
//         res.status(500).json({ msg: "Error al eliminar el carrito" });
//       }

//       const parametros = `/${ID_pedido}/1`;
//       const nuevaURL = datosCompra.currentURL + "/compra-finalizada" + parametros;

//       console.log(nuevaURL);
//       res.redirect(nuevaURL);
//     } else {
//       res.status(400).json({ message: "La orden no se completó correctamente" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "Internal Server error" });
//   }
// };

// export const createOrderMembresia = async (req, res) => {
//   const { ID_usuario, total, currentURL, nombre, tipoMembresiaID, correo, ID_UnicoMembresia } = req.body;
//   membresiaData.setUserData(ID_usuario, total, currentURL, tipoMembresiaID, correo, ID_UnicoMembresia);
//   try {
//     const order = {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "MXN",
//             value: total,
//             breakdown: {
//               item_total: { currency_code: "MXN", value: total },
//             }
//           },
//           items: [
//             {
//               name: nombre,
//               unit_amount: { currency_code: "MXN", value: total },
//               quantity: 1,
//             }
//           ]
//         }
//       ],
//       application_context: {
//         brand_name: "mycompany.com",
//         landing_page: "NO_PREFERENCE",
//         user_action: "PAY_NOW",
//         return_url: `${HOST}/api/capture-order-membresia`,
//         cancel_url: `${HOST}/api/cancel-payment`,
//       },
//     };

//     // format the body
//     const params = new URLSearchParams();
//     params.append("grant_type", "client_credentials");

//     // Generate an access token
//     const {
//       data: { access_token },
//     } = await axios.post(
//       "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     // console.log(access_token);

//     // make a request
//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders`,
//       order,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     // console.log(response.data);

//     return res.json(response.data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Something goes wrong");
//   }
// };

// export const captureOrderMembresia = async (req, res) => {
//   const { token } = req.query;

//   try {
//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
//       {},
//       {
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     console.log("CAPTURE ORDER", response.data);

//     if (response.data.status === 'COMPLETED') {
//       const datosCompra = membresiaData.getUserData();


//       const fechaHoraActual = await obtenerFechaHoraActual();
//       const fechaVencimiento = await calcularFechaVencimiento(datosCompra.ID_UnicoMembresia);

//       const responseCrearQRMembresiaImagenUrl = await crearQRMembresia({
//         body: {
//           ID_usuario: datosCompra.userID,
//           fechaInicio: fechaHoraActual,
//           fechaVencimiento: fechaVencimiento,
//           ID_tipoMembresia: datosCompra.tipoMembresiaID,
//           email: datosCompra.correo
//         }
//       });

//       const ID_membresiaUsuario = await addNewMembresiaUsuario({
//         body: {
//           ID_usuario: datosCompra.userID,
//           ID_tipoMembresia: datosCompra.tipoMembresiaID,
//           fechaInicio: fechaHoraActual,
//           fechaVencimiento: fechaVencimiento,
//           imagenUrl: responseCrearQRMembresiaImagenUrl
//         }
//       });

//       try {
//         const responseHistorialMembresia = await addNewHistorialMembresia({
//           body: {
//             ID_usuario: datosCompra.userID,
//             ID_tipoMembresia: datosCompra.tipoMembresiaID,
//             fechaInicio: fechaHoraActual,
//             fechaVencimiento: fechaVencimiento,
//             precio: datosCompra.total,
//             operacion_id: response.data.id,
//             operacion_status: response.data.status
//           }
//         });
//         // console.log("responseHistorialMembresia", responseHistorialMembresia)
//         // console.log("Detalles de pedido añadidos correctamente");
//         // res.status(200).json({ msg: "Detalles de pedido añadidos correctamente" });
//       } catch (error) {
//         console.error("Error al agregar la historial de la membresia", error.message);
//         res.status(500).json({ msg: "Error al agregar  la historial de la membresia" });
//       }

//       const parametros = `/${ID_membresiaUsuario}/2`;
//       // const parametros = `/1/2`;
//       const nuevaURL = datosCompra.currentURL + "/compra-finalizada" + parametros;

//       console.log("nuevaURL", nuevaURL);
//       res.redirect(nuevaURL);
//     } else {
//       res.status(400).json({ message: "La orden no se completó correctamente" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "Internal Server error" });
//   }
// };

// export const createOrderMembresiaActualizar = async (req, res) => {
//   const { ID_membresiaUsuario, ID_usuario, total, currentURL, nombre, tipoMembresiaID, correo, ID_UnicoMembresia, fechaVencimiento } = req.body;
//   membresiaData.setUserData(ID_usuario, total, currentURL, tipoMembresiaID, correo, ID_UnicoMembresia, fechaVencimiento, ID_membresiaUsuario);
//   try {
//     const order = {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "MXN",
//             value: total,
//             breakdown: {
//               item_total: { currency_code: "MXN", value: total },
//             }
//           },
//           items: [
//             {
//               name: nombre,
//               unit_amount: { currency_code: "MXN", value: total },
//               quantity: 1,
//             }
//           ]
//         }
//       ],
//       application_context: {
//         brand_name: "mycompany.com",
//         landing_page: "NO_PREFERENCE",
//         user_action: "PAY_NOW",
//         return_url: `${HOST}/api/capture-order-membresia-actualizar`,
//         cancel_url: `${HOST}/api/cancel-payment`,
//       },
//     };

//     // format the body
//     const params = new URLSearchParams();
//     params.append("grant_type", "client_credentials");

//     // Generate an access token
//     const {
//       data: { access_token },
//     } = await axios.post(
//       "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     // console.log(access_token);

//     // make a request
//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders`,
//       order,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     // console.log(response.data);

//     return res.json(response.data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Something goes wrong");
//   }
// };
// export const captureOrderMembresiaActualizar = async (req, res) => {
//   const { token } = req.query;

//   try {
//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
//       {},
//       {
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     // console.log("CAPTURE ORDER", response.data);

//     if (response.data.status === 'COMPLETED') {
//       const datosCompra = membresiaData.getUserData();

//       const fechaHoraActual = await obtenerFechaHoraActual();

//       const responseCrearQRMembresiaImagenUrl = await crearQRMembresia({
//         body: {
//           ID_usuario: datosCompra.userID,
//           fechaInicio: fechaHoraActual,
//           fechaVencimiento: datosCompra.fechaVencimiento,
//           ID_tipoMembresia: datosCompra.tipoMembresiaID,
//           email: datosCompra.correo
//         }
//       });

//       await updateMembresiaUsuarioByIdActualizar({
//         body: {
//           ID_membresiaUsuario: datosCompra.ID_membresiaUsuario,
//           ID_usuario: datosCompra.userID,
//           ID_tipoMembresia: datosCompra.tipoMembresiaID,
//           fechaInicio: fechaHoraActual,
//           fechaVencimiento: datosCompra.fechaVencimiento,
//           imagenUrl: responseCrearQRMembresiaImagenUrl
//         }
//       });

//       try {
//         const responseHistorialMembresia = await addNewHistorialMembresia({
//           body: {
//             ID_usuario: datosCompra.userID,
//             ID_tipoMembresia: datosCompra.tipoMembresiaID,
//             fechaInicio: fechaHoraActual,
//             fechaVencimiento: datosCompra.fechaVencimiento,
//             precio: datosCompra.total,
//             operacion_id: response.data.id,
//             operacion_status: response.data.status
//           }
//         });
//       } catch (error) {
//         console.error("Error al agregar la historial de la membresia", error.message);
//         res.status(500).json({ msg: "Error al agregar  la historial de la membresia" });
//       }

//       const parametros = `/${datosCompra.ID_membresiaUsuario}/2`;
//       // const parametros = `/1/2`;
//       const nuevaURL = datosCompra.currentURL + "/compra-finalizada" + parametros;

//       // console.log("nuevaURL", nuevaURL);
//       res.redirect(nuevaURL);
//     } else {
//       res.status(400).json({ message: "La orden no se completó correctamente" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "Internal Server error" });
//   }
// };


// export const cancelPayment = (req, res) => res.redirect("/");
