// import { getConnection, querysLogsBloqueoInicioSesion, sql } from "../database";
// import requestIp from 'request-ip';
// import { obtenerFechaHoraActual } from "../utilidades/dateUtils.js";

// export const getAllLogsBloqueoInicioSesion = async (req, res) => {
//   try {
//     const pool = await getConnection();
//     const result = await pool.request().query(querysLogsBloqueoInicioSesion.getAllLogsBloqueoInicioSesion);
//     res.json(result.recordset);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const addNewLogBloqueoInicioSesion = async (req, res) => {
//   const { CorreoElectronico } = req.body;
//   const clientIp = requestIp.getClientIp(req);
//   // console.log(CorreoElectronico)
//   // console.log("IP del cliente:", clientIp);

//   // console.log(req.body)
//   const FechaHoraEvento = await obtenerFechaHoraActual();
//   try {
//     const pool = await getConnection();
//     await pool
//       .request()
//       .input("IPUsuario", sql.VarChar(50), clientIp)
//       .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
//       .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
//       .query(querysLogsBloqueoInicioSesion.addNewLogBloqueoInicioSesion);
//     res.json({ msg: 'Nuevo registro de bloqueo de inicio de sesión creado correctamente' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getLogBloqueoInicioSesionById = async (req, res) => {
//   try {
//     const pool = await getConnection();
//     const result = await pool
//       .request()
//       .input("IDRegistro", req.params.id)
//       .query(querysLogsBloqueoInicioSesion.getLogBloqueoInicioSesionById);
//     return res.json(result.recordset[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteLogBloqueoInicioSesionById = async (req, res) => {
//   try {
//     const pool = await getConnection();
//     const result = await pool
//       .request()
//       .input("IDRegistro", req.params.id)
//       .query(querysLogsBloqueoInicioSesion.deleteLogBloqueoInicioSesionById);
//     if (result.rowsAffected[0] === 0) return res.sendStatus(404);
//     return res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const updateLogBloqueoInicioSesionById = async (req, res) => {
//   const { IPUsuario, FechaHoraEvento, CorreoElectronico } = req.body;

//   try {
//     const pool = await getConnection();
//     await pool
//       .request()
//       .input("IPUsuario", sql.VarChar(50), IPUsuario)
//       .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
//       .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
//       .input("IDRegistro", req.params.id)
//       .query(querysLogsBloqueoInicioSesion.updateLogBloqueoInicioSesionById);
//     res.json({ msg: 'Registro de bloqueo de inicio de sesión actualizado correctamente' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
