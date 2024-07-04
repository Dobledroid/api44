import { getConnection, querysLogsInicioSesionOAuth, sql } from "../database";

import requestIp from 'request-ip';
import { obtenerFechaHoraActual } from "../utilidades/dateUtils.js";

export const getAllLogsInicioSesionOAuth = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysLogsInicioSesionOAuth.getAllLogsInicioSesionOAuth);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const addNewLogInicioSesionOAuth = async (req, res) => {
  const { CorreoElectronico, ProveedorOAuth } = req.body;

  const clientIp = requestIp.getClientIp(req);
  const FechaHoraEvento = await obtenerFechaHoraActual();

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IPUsuario", sql.VarChar(50), clientIp)
      .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
      .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
      .input("ProveedorOAuth", sql.VarChar(50), ProveedorOAuth)
      .query(querysLogsInicioSesionOAuth.addNewLogInicioSesionOAuth);
    res.json({ msg: 'Nuevo registro de inicio de sesión con OAuth creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLogInicioSesionOAuthById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IDRegistro", req.params.id)
      .query(querysLogsInicioSesionOAuth.getLogInicioSesionOAuthById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLogInicioSesionOAuthById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IDRegistro", req.params.id)
      .query(querysLogsInicioSesionOAuth.deleteLogInicioSesionOAuthById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLogInicioSesionOAuthById = async (req, res) => {
  const { IPUsuario, FechaHoraEvento, CorreoElectronico, ProveedorOAuth } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IPUsuario", sql.VarChar(50), IPUsuario)
      .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
      .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
      .input("ProveedorOAuth", sql.VarChar(50), ProveedorOAuth)
      .input("IDRegistro", req.params.id)
      .query(querysLogsInicioSesionOAuth.updateLogInicioSesionOAuthById);
    res.json({ msg: 'Registro de inicio de sesión con OAuth actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
