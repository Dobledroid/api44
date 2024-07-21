import { getConnection, sql, querysFavoritos } from "../database";

import { obtenerFechaHoraActual } from "../utilidades/dateUtils";


export const getFavoritos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysFavoritos.getAllFavoritos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getFavoritosByUsuario = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, req.params.id)
      .query(querysFavoritos.getFavoritosByUsuario);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getFavoritosPorUsuario = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, req.params.id)
      .query(querysFavoritos.getFavoritosPorUsuario);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const addNuevoFavorito = async (req, res) => {
  
  console.log("addNuevoFavorito", req.body)
  const { ID_usuario, ID_producto } = req.body;

  if (ID_usuario == null || ID_producto == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const fechaAgregado = await obtenerFechaHoraActual();
    console.log("addNuevoFavorito", fechaAgregado)
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_producto", sql.Int, ID_producto)
      .input("fechaAgregado", sql.VarChar, fechaAgregado)
      .query(querysFavoritos.addNuevoFavorito);
    res.json({ ID_usuario, ID_producto, fechaAgregado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteFavoritoById = async (req, res) => {
  console.log("deleteFavoritoById", req.params.id)
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_favorito", sql.Int, req.params.id)
      .query(querysFavoritos.deleteFavoritoById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getFavoritoById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_favorito", sql.Int, req.params.id)
      .query(querysFavoritos.getFavoritoById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateFavoritoById = async (req, res) => {
  const { ID_usuario, ID_producto } = req.body;

  if (ID_usuario == null || ID_producto == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const fechaAgregado = await obtenerFechaHoraActual();
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_producto", sql.Int, ID_producto)
      .input("fechaAgregado", sql.VarChar, fechaAgregado)
      .input("ID_favorito", sql.Int, req.params.id)
      .query(querysFavoritos.updateFavoritoById);
    res.json({ ID_usuario, ID_producto, fechaAgregado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const isFavorito = async (req, res) => {
  try {
    const { ID_usuario, ID_producto } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_producto", sql.Int, ID_producto)
      .query(querysFavoritos.isFavorito);

    if (result.recordset.length > 0) {
      return res.json({ ...result.recordset[0], isFavorito: true });
    } else {
      return res.json({ isFavorito: false });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getCantidadFavoritosByUsuario = async (req, res) => {
  console.log("req.params", req.params)
  const { ID_usuario } = req.params;

  if (ID_usuario == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione ID de usuario' });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysFavoritos.getCantidadFavoritosByUsuario);
    return res.json({ cantidad: result.recordset[0].cantidad });
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message);
  }
};