import { getConnection, querysRoles, sql } from "../database";

export const addNewRol = async (req, res) => {
  const { rol } = req.body;

  if (rol == null || rol === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide a name for the role' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("rol", sql.NVarChar, rol)
      .query(querysRoles.addNewRol);
    res.json({ rol });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getRolById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdRol", req.params.id)
      .query(querysRoles.getRolById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteRolById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdRol", req.params.id)
      .query(querysRoles.deleteRolById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateRolById = async (req, res) => {
  const { rol } = req.body;

  if (rol == null || rol === '') {
    return res.status(400).json({ msg: 'Bad Request. Please provide a name for the role' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("rol", sql.NVarChar, rol)
      .input("IdRol", req.params.id)
      .query(querysRoles.updateRolById);
    res.json({ rol });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
