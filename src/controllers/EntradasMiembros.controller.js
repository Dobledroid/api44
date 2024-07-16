import { getConnection, querysEntradasMiembros, sql } from "../database";

export const getEntradasMiembros = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysEntradasMiembros.getAllEntradasMiembros);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewEntradaMiembro = async (req, res) => {
  const { ID_usuario, fechaEntrada } = req.body;

  if (!ID_usuario || !fechaEntrada) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("fechaEntrada", sql.DateTime, fechaEntrada)
      .query(querysEntradasMiembros.addNewEntradasMiembros);

    const entradaId = result.recordset[0].ID_entrada;
    res.json({ msg: "Entrada creada exitosamente.", ID_entrada: entradaId });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getEntradasMiembrosById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdEntrada", req.params.id)
      .query(querysEntradasMiembros.getEntradasMiembrosById);
    return res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const getEntradasMiembrosByUsuarioId = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("ID_usuario", sql.Int, req.params.id)
        .query(querysEntradasMiembros.getEntradasMiembrosByUsuarioId);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

export const updateEntradasMiembrosById = async (req, res) => {
  const { ID_usuario, fechaEntrada } = req.body;
  if (!ID_usuario || !fechaEntrada) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IdEntrada", sql.Int, req.params.id)
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("fechaEntrada", sql.DateTime, fechaEntrada)
      .query(querysEntradasMiembros.updateEntradasMiembrosById);
    return res.status(200).json({ msg: "Entrada actualizada exitosamente." });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteEntradasMiembrosById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdEntrada", req.params.id)
      .query(querysEntradasMiembros.deleteEntradasMiembros);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
