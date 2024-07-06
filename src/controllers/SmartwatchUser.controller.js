import { getConnection, querysSmartwatchUser, sql } from "../database";

export const getSmartwatchUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysSmartwatchUser.getAllSmartwatchUsers);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewSmartwatchUser = async (req, res) => {
  const { ID_usuario, genero, nacido, altura, peso } = req.body;

  if (!ID_usuario || !genero || !nacido || !altura || !peso) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("genero", sql.VarChar, genero)
      .input("nacido", sql.Int, nacido)
      .input("altura", sql.Float, altura)
      .input("peso", sql.Float, peso)
      .query(querysSmartwatchUser.addNewSmartwatchUser);

    const smartwatchUserId = result.recordset[0].ID_usuarioSmartWatch;
    res.json({ msg: "Usuario de smartwatch creado exitosamente.", ID_usuarioSmartWatch: smartwatchUserId });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getSmartwatchUserById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUsuarioSmartWatch", req.params.id)
      .query(querysSmartwatchUser.getSmartwatchUserById);
    return res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateSmartwatchUserById = async (req, res) => {
  const { genero, nacido, altura, peso } = req.body;
  if (!genero || !nacido || !altura || !peso) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IdUsuarioSmartWatch", sql.Int, req.params.id)
      .input("genero", sql.VarChar, genero)
      .input("nacido", sql.Int, nacido)
      .input("altura", sql.Float, altura)
      .input("peso", sql.Float, peso)
      .query(querysSmartwatchUser.updateSmartwatchUserById);
    return res.status(200).json({ msg: "Usuario de smartwatch actualizado exitosamente." });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteSmartwatchUserById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUsuarioSmartWatch", req.params.id)
      .query(querysSmartwatchUser.deleteSmartwatchUser);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
