import { getConnection, querysMarcas, sql } from '../database';

export const getAllMarcas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysMarcas.getAllMarcas);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMarcaById = async (req, res) => {
  const { IdMarca } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('IdMarca', sql.Int, IdMarca)
      .query(querysMarcas.getMarcaById);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getMarcasByCategoriaId = async (req, res) => {
  try {
    const pool = await getConnection();
    const { id } = req.params;

    const result = await pool
      .request()
      .input("IdCategoria", sql.Int, id)
      .query(querysMarcas.getMarcasByID_marca);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addNewMarca = async (req, res) => {
  const { nombre, IdCategoria } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('nombre', sql.NVarChar, nombre)
      .input('IdCategoria', sql.Int, IdCategoria)
      .query(querysMarcas.addNewMarca);
    res.json({ message: 'Marca agregada correctamente' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar una marca por su ID
export const deleteMarca = async (req, res) => {
  const { IdMarca } = req.params;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('IdMarca', sql.Int, IdMarca)
      .query(querysMarcas.deleteMarca);
    res.json({ message: 'Marca eliminada correctamente' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener el total de marcas
export const getTotalMarcas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysMarcas.getTotalMarcas);
    res.json(result.recordset[0]['']);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar una marca por su ID
export const updateMarcaById = async (req, res) => {
  const { IdMarca } = req.params;
  const { nombre, IdCategoria } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('nombre', sql.NVarChar, nombre)
      .input('IdCategoria', sql.Int, IdCategoria)
      .input('IdMarca', sql.Int, IdMarca)
      .query(querysMarcas.updateMarcaById);
    res.json({ message: 'Marca actualizada correctamente' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
