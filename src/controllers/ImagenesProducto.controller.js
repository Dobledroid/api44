import { getConnection, querysImagenesProducto, sql } from "../database";

export const addNewImagen = async (req, res) => {
  const { ID_producto, imagenUrl } = req.body;

  if (ID_producto == null || imagenUrl == null || imagenUrl === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide product ID and image URL' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_producto", sql.Int, ID_producto)
      .input("imagenUrl", sql.VarChar, imagenUrl)
      .query(querysImagenesProducto.addNewImagen);
    res.json({ ID_producto, imagenUrl });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getImagenesByProductoId = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_producto", sql.Int, req.params.ID_producto)
      .query(querysImagenesProducto.getImagenesByProductoId);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const deleteImagenById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_imagen", sql.Int, req.params.ID_imagen)
      .query(querysImagenesProducto.deleteImagenById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateImagenById = async (req, res) => {
  const { imagenUrl } = req.body;

  if (imagenUrl == null || imagenUrl === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide a valid image URL' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("imagenUrl", sql.VarChar, imagenUrl)
      .input("ID_imagen", sql.Int, req.params.ID_imagen)
      .query(querysImagenesProducto.updateImagenById);
    res.json({ imagenUrl });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};
