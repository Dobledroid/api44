// import app from "./app";

// app.listen(app.get("port"));

// console.log("Server on port", app.get("port"));
import { app } from "./app";

const PORT = process.env.PORT || 3001; // Puerto por defecto 3001

// const crypto = require('crypto');

// // Generar una clave secreta de 32 bytes
// const secretKey = crypto.randomBytes(32).toString('hex');

// console.log(secretKey);

app.listen(PORT, () => {
  // console.log(secretKey);
  console.log(`Servidor en el puerto ${PORT}`);
});
