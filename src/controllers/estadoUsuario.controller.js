import { getConnection, querysEstadoUsuario, sql } from "../database";

export const getEstadoUsuarioByUserId = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUser", req.params.id)
      .query(querysEstadoUsuario.getEstadoUsuarioByUserId);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addNewEstadoUsuario = async (req, res) => {
  const { ID_usuario, estado, descripcion } = req.body;
  console.log("addNewEstadoUsuario: ID_usuario, estado, descripcion", ID_usuario, estado, descripcion)
  if (ID_usuario == null || estado == null || descripcion == null || descripcion === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide both estado and descripcion' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("estado", sql.Bit, estado)
      .input("descripcion", sql.NVarChar, descripcion)
      .query(querysEstadoUsuario.addNewEstadoUsuario);
    //res.json({ ID_usuario, estado, descripcion });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteEstadoUsuarioById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUsuario", req.params.id)
      .query(querysEstadoUsuario.deleteEstadoUsuarioById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateEstadoUsuarioById = async (req, res) => {
  const { estado, descripcion } = req.body;

  if (estado == null || descripcion == null || descripcion === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide both estado and descripcion' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("estado", sql.Bit, estado)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("IdUsuario", req.params.id)
      .query(querysEstadoUsuario.updateEstadoUsuarioById);
    res.json({ estado, descripcion });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
