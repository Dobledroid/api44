import { getConnection, querysLogsInicioSesion, sql } from "../database";
import requestIp from 'request-ip';
import { obtenerFechaHoraActual } from "../utilidades/dateUtils.js";

export const getAllLogsInicioSesion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysLogsInicioSesion.getAllLogsLogsInicioSesion);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const addNewLogInicioSesion = async (req, res) => {
  
  const { CorreoElectronico, URLSolicitada, CodigoEstadoHTTP } = req.body;
  
  const clientIp = requestIp.getClientIp(req);

  // console.log("IP del cliente:", clientIp);

  // console.log(req.body)
  const FechaHoraEvento = await obtenerFechaHoraActual();
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IPUsuario", sql.VarChar(50), clientIp)
      .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
      .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
      .input("URLSolicitada", sql.VarChar(255), URLSolicitada)
      .input("CodigoEstadoHTTP", sql.Int, CodigoEstadoHTTP)
      .query(querysLogsInicioSesion.addNewLogInicioSesion);
    res.json({ msg: 'Nuevo registro de inicio de sesión creado correctamente' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getLogInicioSesionById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_registro", req.params.id)
      .query(querysLogsInicioSesion.getLogInicioSesionById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLogInicioSesionById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_registro", req.params.id)
      .query(querysLogsInicioSesion.deleteLogInicioSesionById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLogInicioSesionById = async (req, res) => {
  const { IPUsuario, FechaHoraEvento, CorreoElectronico, URLSolicitada, CodigoEstadoHTTP } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IPUsuario", sql.VarChar(50), IPUsuario)
      .input("FechaHoraEvento", sql.DateTime, FechaHoraEvento)
      .input("CorreoElectronico", sql.VarChar(255), CorreoElectronico)
      .input("URLSolicitada", sql.VarChar(255), URLSolicitada)
      .input("CodigoEstadoHTTP", sql.Int, CodigoEstadoHTTP)
      .input("ID_registro", req.params.id)
      .query(querysLogsInicioSesion.updateLogInicioSesionById);
    res.json({ msg: 'Registro de inicio de sesión actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
