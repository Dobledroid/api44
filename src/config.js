import { config } from "dotenv";
config();

export default {
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbServer: process.env.DB_SERVER,
  dbDatabase: process.env.DB_DATABASE,
  MESSAGE: process.env.MESSAGE,
};

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = process.env.PAYPAL_API;

// Server
export const HOST =
  process.env.NODE_ENV === "production"
    ? process.env.HOST
    : "http://localhost:" + 4000;


// export default {
//   port: process.env.PORT || 4000,
//   dbUser: process.env.DB_USER || "user1",
//   dbPassword: process.env.DB_PASSWORD || "Yarayerena2018",
//   dbServer: process.env.DB_SERVER || "localhost",
//   dbDatabase: process.env.DB_DATABASE || "SportGYM",
// };

// export default {
//   port: process.env.PORT || 4000,
//   dbUser: process.env.DB_USER || "sqlserver",
//   dbPassword: process.env.DB_PASSWORD || "sqlserver",
//   dbServer: process.env.DB_SERVER || "104.155.155.22",
//   dbDatabase: process.env.DB_DATABASE || "SportGYM",
// };

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;

export const MESSAGE = process.env.MESSAGE;