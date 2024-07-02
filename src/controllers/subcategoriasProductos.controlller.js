import { getConnection, querysSubcategoriasProductos, sql } from "../database";

export const getAllSubcategoriasProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysSubcategoriasProductos.getAllSubcategoriasProductos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getSubcategoriaProductoById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdSubcategoria", req.params.id)
      .query(querysSubcategoriasProductos.getSubcategoriaProductoById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getSubcategoriasByCategoriaId = async (req, res) => {
  try {
    const pool = await getConnection();

    const { id } = req.params;

    const result = await pool
      .request()
      .input("IdCategoria", sql.Int, id)
      .query(querysSubcategoriasProductos.getCategoriasByID_categoria);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const addNewSubcategoriaProducto = async (req, res) => {
  const { nombre, idCategoria } = req.body;

  if (nombre == null || idCategoria == null || nombre === '' || idCategoria === '') {
    return res.status(400).json({ msg: "Bad Request. Please provide a name and a category ID" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("IdCategoria", sql.Int, idCategoria)
      .query(querysSubcategoriasProductos.addNewSubcategoriaProducto);

    res.json({ nombre, idCategoria });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteSubcategoriaProductoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdSubcategoria", req.params.id)
      .query(querysSubcategoriasProductos.deleteSubcategoriaProductoById);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalSubcategoriasProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysSubcategoriasProductos.getTotalSubcategoriasProductos);
    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateSubcategoriaProductoById = async (req, res) => {
  const { nombre, idCategoria } = req.body;

  if (nombre == null || idCategoria == null || nombre === '' || idCategoria === '') {
    return res.status(400).json({ msg: "Bad Request. Please provide a name and a category ID" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("IdCategoria", sql.Int, idCategoria)
      .input("IdSubcategoria", req.params.id)
      .query(querysSubcategoriasProductos.updateSubcategoriaProductoById);

    res.json({ nombre, idCategoria });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
