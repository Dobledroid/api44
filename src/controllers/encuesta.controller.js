import { getConnection, sql, querysEncuesta } from "../database";

// Obtener todas las respuestas de la encuesta
export const getRespuestas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysEncuesta.getAllRespuestas);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener respuestas por ID de usuario
export const getRespuestasByUsuario = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, req.params.id)
      .query(querysEncuesta.getRespuestasByUsuario);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Añadir una nueva respuesta de encuesta
export const addNewRespuesta = async (req, res) => {
  const { ID_usuario, Respuesta, FechaRespuesta } = req.body;

  if (ID_usuario == null || Respuesta == null || FechaRespuesta == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("Respuesta", sql.NVarChar, Respuesta)
      .input("FechaRespuesta", sql.DateTime, FechaRespuesta)
      .query(querysEncuesta.addNewRespuesta);
    res.json({ ID_usuario, Respuesta, FechaRespuesta });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener una respuesta específica por ID de encuesta
export const getRespuestaById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_encuesta", sql.Int, req.params.id)
      .query(querysEncuesta.getRespuestaById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar una respuesta por ID de encuesta
export const deleteRespuestaById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_encuesta", sql.Int, req.params.id)
      .query(querysEncuesta.deleteRespuestaById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar una respuesta por ID de encuesta
export const updateRespuestaById = async (req, res) => {
  const { ID_usuario, Respuesta, FechaRespuesta } = req.body;

  if (ID_usuario == null || Respuesta == null || FechaRespuesta == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("Respuesta", sql.NVarChar, Respuesta)
      .input("FechaRespuesta", sql.DateTime, FechaRespuesta)
      .input("ID_encuesta", sql.Int, req.params.id)
      .query(querysEncuesta.updateRespuestaById);
    res.json({ ID_usuario, Respuesta, FechaRespuesta });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getRespuestasByFecha = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;
  console.log(fechaInicio, fechaFin)
  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ msg: 'Bad Request. Please provide start and end dates' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("FechaInicio", sql.DateTime, fechaInicio)
      .input("FechaFin", sql.DateTime, fechaFin)
      .query(querysEncuesta.getRespuestasByFecha);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};