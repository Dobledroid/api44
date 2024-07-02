import { getConnection, querysCategoriasProductos, sql } from "../database";

export const getCategoriasProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysCategoriasProductos.getAllCategoriasProductos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCategoriaProductoById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdCategoria", req.params.id)
      .query(querysCategoriasProductos.getCategoriaProductoById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const addNewCategoriaProducto = async (req, res) => {
  const { nombre } = req.body;

  if (nombre == null || nombre === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide a name for the category' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .query(querysCategoriasProductos.addNewCategoriaProducto);
    res.json({ nombre });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCategoriaProductoById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdCategoria", req.params.id)
      .query(querysCategoriasProductos.deleteCategoriaProducto);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalCategoriasProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysCategoriasProductos.getTotalCategoriasProductos);
    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCategoriaProductoById = async (req, res) => {
  const { nombre } = req.body;

  if (nombre == null || nombre === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide a name for the category' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("IdCategoria", req.params.id)
      .query(querysCategoriasProductos.updateCategoriaProductoById);
    res.json({ nombre });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
