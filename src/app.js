import express from "express";
import cors from "cors";
// const multer = require('multer');
// const bodyParser = require('body-parser');
import passport from 'passport';
// import './passport-config';
// import requestIp from 'request-ip';

import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import categoriasProdutosRoutes from "./routes/categoriasProductos.routes";
import subcategoriasProductosRoutes from "./routes/subcategoriasProductos.routes";
import marcasProductos from "./routes/marcasProductos.routes";
import TokenRoutes from "./routes/token.routes";
import emailRoutes from "./routes/email.routes";
import sendMethod from "./routes/send.routes";
import estadoCuentaRoutes from "./routes/estadoCuenta.routes";
// import paymentRoutes from "./routes/payment.routes.js";
import tiposMembresias from "./routes/tiposMembresias.routes.js";
import membresiasUsuarios from "./routes/membresiasUsuarios.routes.js";
import historialMembresias from "./routes/historialMembresias.routes.js";
import carritoCompras from "./routes/carritoCompras.routes.js";
import direccionEnvio from "./routes/direccionEnvio.routes.js";
import direccionEnvioPredeterminada from "./routes/direccionEnvioPredeterminada.routes.js";
import date from "./routes/date.routes.js";
import prueba from "./routes/prueba.routes.js";
import QRRoutes from "./routes/QR.routes.js";
// import cloudinaryRoutes from "./routes/cloudinary.routes";
import preguntaRoutes from "./routes/pregunta.routes.js";
import ordenesPedidos from "./routes/ordenesPedidos.routes.js";
import detallesPedido from "./routes/detallesPedido.routes.js";

// LOGS
import logsActualizacionDatosSensibles from "./routes/logsActualizacionDatosSensibles.routes.js";
import logsBloqueoInicioSesion from "./routes/logsBloqueoInicioSesion.routes.js";
import logsInicioSesion from "./routes/logsInicioSesion.routes.js";
import logsInicioSesionOAuth from "./routes/logsInicioSesionOAuth.routes.js";

//PAGOS
import paypalRoutes from "./routes/paypal.routes.js";

//SMARTWACHT
import smartwatchUserRoutes from "./routes/SmartwatchUser.routes.js";
import smartwatchMetricsRoutes from "./routes/SmartwatchMetrics.routes.js";


import morgan from "morgan";
import helmet from 'helmet';

import config from "./config";


const app = express();

app.use(helmet());
// app.use(morgan('combined'));
// settings
app.set("port", config.port);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Inicializa Passport.js
app.use(passport.initialize());


// Manejo de la ruta raíz
app.get("/", (req, res) => {
  const message = config.MESSAGE;
  if (message) {
    res.send(`¡Hola, este es mi servidor ${config.MESSAGE}!`);
  } else {
    res.send("¡Hola, este es mi servidor !");
  }
});
// app.set('trust proxy', true);

// app.get('/', (req, res) => {
//   const clientIp = requestIp.getClientIp(req);
//   console.log("IP del cliente:", clientIp);
//   res.send('Hello World');
// });

app.get("/api", (req, res) => {
  res.send("¡APIw!");
});

app.get("/users", (req, res) => {
  res.send("Obteniendo información del usuario!");
});

// // Configuración de body-parser para manejar datos JSON
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Configuración de multer para manejar la carga de archivos
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });


// // Ruta para manejar la carga de archivos
// app.post('/api/upload', upload.array('images', 10), (req, res) => {
//   const { name, email } = req.body;
//   const files = req.files;

//   console.log('Name:', name);
//   console.log('Email:', email);
//   console.log('Files:', files);

//   res.json({
//     message: 'Datos recibidos exitosamente',
//     data: {
//       name,
//       email,
//       files
//     }
//   });
// });

// Routes
app.use("/api", productRoutes);
app.use("/api", usersRoutes);
app.use("/api", emailRoutes);
app.use("/api", sendMethod);
// app.use("/api", cloudinaryRoutes);
app.use("/api", TokenRoutes);
app.use("/api", categoriasProdutosRoutes);
app.use("/api", subcategoriasProductosRoutes);
app.use("/api", marcasProductos);
app.use("/api", estadoCuentaRoutes);
// app.use("/api", paymentRoutes);
app.use("/api", tiposMembresias);
app.use("/api", membresiasUsuarios);
app.use("/api", historialMembresias);
app.use("/api", carritoCompras);
app.use("/api", direccionEnvio);
app.use("/api", direccionEnvioPredeterminada);
app.use("/api", date);
app.use("/api", prueba);
app.use("/api", QRRoutes);
app.use("/api",preguntaRoutes);
app.use("/api", ordenesPedidos);
app.use("/api", detallesPedido);

// app.use("/api", paypalRoutes);

// logs
app.use("/api", logsActualizacionDatosSensibles);
app.use("/api", logsBloqueoInicioSesion);
app.use("/api", logsInicioSesion);
app.use("/api", logsInicioSesionOAuth);

//Smartwacht
app.use("/api", smartwatchUserRoutes);
app.use("/api", smartwatchMetricsRoutes);

//Nuevo cambio

export { app };