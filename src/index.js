// import app from "./app";

// app.listen(app.get("port"));

// console.log("Server on port", app.get("port"));
import { app } from "./app";
import config from "./config";

const PORT = config.port;

import { obtenerHoraActual, obtenerFechaHoraActual,obtenerFechaActual, obtenerMinutosActuales, sumarMinutos, sumarHoras, sumarDias, calcularMes,
  calcularFechaVencimiento
 } from './utilidades/dateUtils';


const obtenerInformacionTiempo = async () => {
  try {

  //   const horaActual = await obtenerHoraActual();
  //   const fechaActual = await obtenerFechaActual();
  //   const minutosActuales = await obtenerMinutosActuales();
  //   const fechaHoraActual = await obtenerFechaHoraActual();
    

  //   sumarMinutos(1).then((nuevaFechaMinutos) => {
  //     console.log("Nueva fecha con 1 minutos:", nuevaFechaMinutos);
  //   });
    
  //   sumarHoras(3).then((nuevaFechaHoras) => {
  //     console.log("Nueva fecha con 3 horas:", nuevaFechaHoras);
  //   });
    
  //   sumarDias(2).then((nuevaFechaDias) => {
  //     console.log("Nueva fecha con 2 días:", nuevaFechaDias);
  //   });
    
  //   calcularMes().then((mes) => {
  //     console.log("Calculo del mes:", mes);
  //   });
  //   calcularFechaVencimiento()
  // .then((fechaVencimiento) => {
  //   console.log('Fecha de vencimiento de la membresía:', fechaVencimiento);
  // })
  // .catch((error) => {
  //   console.error('Error al calcular la fecha de vencimiento:', error.message);
  // });
  //   console.log('Hora actual:', horaActual);
  //   console.log('Fecha actual:', fechaActual);
  //   console.log('Fecha, Hora actual:', fechaHoraActual);
  //   console.log('Minutos actuales:', minutosActuales);

  } catch (error) {
    console.error('Error al obtener la información del tiempo:', error.message);
  }
};


// const crypto = require('crypto');

// // Generar una clave secreta de 32 bytes
// const secretKey = crypto.randomBytes(32).toString('hex');

// console.log(secretKey);

app.listen(PORT, () => {
  // console.log(secretKey);
  // obtenerInformacionTiempo();
  
  console.log(`Servidor en el puerto ${PORT}`);
});
