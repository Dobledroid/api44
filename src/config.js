// import { config } from "dotenv";
// config();

// export default {
//   port: process.env.PORT,
//   dbUser: process.env.DB_USER,
//   dbPassword: process.env.DB_PASSWORD,
//   dbServer: process.env.DB_SERVER,
//   dbDatabase: process.env.DB_DATABASE,
//   MESSAGE: process.env.MESSAGE,
// };

// export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
// export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
// export const PAYPAL_API = process.env.PAYPAL_API;

// // Server
// export const HOST =
//   process.env.NODE_ENV === "production"
//     ? process.env.HOST
//     : "http://localhost:" + 4000;


// // export default {
// //   port: process.env.PORT || 4000,
// //   dbUser: process.env.DB_USER || "user1",
// //   dbPassword: process.env.DB_PASSWORD || "Yarayerena2018",
// //   dbServer: process.env.DB_SERVER || "localhost",
// //   dbDatabase: process.env.DB_DATABASE || "SportGYM",
// // };

// // export default {
// //   port: process.env.PORT || 4000,
// //   dbUser: process.env.DB_USER || "sqlserver",
// //   dbPassword: process.env.DB_PASSWORD || "sqlserver",
// //   dbServer: process.env.DB_SERVER || "104.155.155.22",
// //   dbDatabase: process.env.DB_DATABASE || "SportGYM",
// // };

// export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;

// export const MESSAGE = process.env.MESSAGE;
import { config } from "dotenv";
config();

export default {
 port: process.env.PORT,
 dbUser: process.env.DB_USER,
 dbPassword: process.env.DB_PASSWORD,
 dbServer: process.env.DB_SERVER,
 dbDatabase: process.env.DB_DATABASE,
};

// export default {
// port: 4000,
// dbUser: "sqlserver",
// dbPassword: "SportGYM",
// dbServer: "SportGYM.mssql.somee.com",
// dbDatabase: "SportGYM",
// STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_51PdbM8Hh07ihkU0MZKqwJewQxLstyyVZv5WMKNf53BfoOlf3baObdLdbvDrC5TPu3VsxTAL6ETzM3tHFYqZmnNtS00tjwnKNnS',
//  };

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT || "AeOX3LTg_2aOey2JAkmaCXnq8Dlgb62O0ugbBJ0pCxSOGRYj7l735jEdwnKDdiscr8Si3PvllbtN28sK";
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET || "EE86KLsR4SvytkNIrVSstK-vBC60Yl4f7BdUAyBpINIbZNM9Z3DC6o9caDugnVDxjiZ8QhwiuV3oiIWe";
export const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";

export const HOST = process.env.NODE_ENV === "production"
  ? process.env.HOST
  : "http://localhost:" + (process.env.PORT || 4000);

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY || "TEST-2722826054068937-022415-a9369346a81cf8254e922cc153009aa9-1699138056";
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL || "cloudinary://853421113914667:v0FgUfCQdrOjhr-jDlf-CeROnQg@dubearvua";

export const SECRECT_JWT = process.env.SECRECT_JWT || "aaa20989a093bec2e1a3d13c3b1fbd9bbcd2f9df158da4ff32447ef69162cac3322a3a6342ce7ad51b8eb9b8c756d7f2c0c4b9bfca5c40d165f36d472eb6e285";

