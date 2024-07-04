import { getConnection, querysLogsActualizacionDatosSensibles, sql } from "../database";
import requestIp from 'request-ip';
import { obtenerFechaHoraActual } from "../utilidades/dateUtils.js";

export const getAllLogsActualizacionDatosSensibles = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysLogsActualizacionDatosSensibles.getAllLogsActualizacionDatosSensibles);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addNewLogActualizacionDatosSensibles = async (req, res) => {
  const { CorreoElectronico, DescripcionAccion } = req.body;

  const clientIp = requestIp.getClientIp(req);
  const FechaHoraEvento = await obtenerFechaHoraActual();

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IPUsuario", sql.VarChar(50), clientIp)
      .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
      .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
      .input("DescripcionAccion", sql.VarChar(500), DescripcionAccion)
      .query(querysLogsActualizacionDatosSensibles.addNewLogActualizacionDatosSensibles);
    res.json({ msg: 'Nuevo registro de actualización de datos sensibles creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLogActualizacionDatosSensiblesById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IDRegistro", req.params.id)
      .query(querysLogsActualizacionDatosSensibles.getLogActualizacionDatosSensiblesById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLogActualizacionDatosSensiblesById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IDRegistro", req.params.id)
      .query(querysLogsActualizacionDatosSensibles.deleteLogActualizacionDatosSensiblesById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLogActualizacionDatosSensiblesById = async (req, res) => {
  const { IPUsuario, FechaHoraEvento, CorreoElectronico, DescripcionAccion } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IPUsuario", sql.VarChar(50), IPUsuario)
      .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
      .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
      .input("DescripcionAccion", sql.VarChar(500), DescripcionAccion)
      .input("IDRegistro", req.params.id)
      .query(querysLogsActualizacionDatosSensibles.updateLogActualizacionDatosSensiblesById);
    res.json({ msg: 'Registro de actualización de datos sensibles actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
