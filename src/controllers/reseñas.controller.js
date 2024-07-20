import { getConnection, sql, querysResenas } from "../database";
import { obtenerFechaHoraActual } from "../utilidades/dateUtils";

export const getResenas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysResenas.getAllResenas);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getResenasByProducto = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_producto", req.params.id)
      .query(querysResenas.getResenasByProducto);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addNewResena = async (req, res) => {
  const { ID_usuario, ID_producto, calificacion, comentario } = req.body;

  console.log("req.body", req.body)
  if (ID_usuario == null || ID_producto == null || calificacion == null || comentario == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const fechaResena = await obtenerFechaHoraActual();
    console.log("fechaResena", fechaResena)

    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_producto", sql.Int, ID_producto)
      .input("calificacion", sql.Int, calificacion)
      .input("comentario", sql.NVarChar, comentario)
      .input("fechaResena", sql.VarChar, fechaResena)
      .query(querysResenas.addNewResena);
    res.json({ ID_usuario, ID_producto, calificacion, comentario, fechaResena });
  } catch (error) {
    console.log("addNewResena", error.message)
    res.status(500).send(error.message);
  }
};

export const deleteResenaById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_resena", req.params.id)
      .query(querysResenas.deleteResenaById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getResenaById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_resena", req.params.id)
      .query(querysResenas.getResenaById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateResenaById = async (req, res) => {
  const { ID_usuario, ID_producto, calificacion, comentario } = req.body;

  if (ID_usuario == null || ID_producto == null || calificacion == null || comentario == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const fechaResena = await obtenerFechaHoraActual();
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_producto", sql.Int, ID_producto)
      .input("calificacion", sql.Int, calificacion)
      .input("comentario", sql.NVarChar, comentario)
      .input("fechaResena", sql.DateTime, fechaResena)
      .input("ID_resena", req.params.id)
      .query(querysResenas.updateResenaById);
    res.json({ ID_usuario, ID_producto, calificacion, comentario, fechaResena });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
