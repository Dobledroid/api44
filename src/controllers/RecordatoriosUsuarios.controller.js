import { getConnection, querysRecordatoriosUsuarios, sql } from "../database";

export const getRecordatoriosUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysRecordatoriosUsuarios.getAllRecordatoriosUsuarios);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewRecordatorioUsuario = async (req, res) => {
  const { ID_usuario, tipoEntrenamiento, horaRecordatorio, fechaRecordatorio } = req.body;

  if (!ID_usuario || !tipoEntrenamiento || !horaRecordatorio || !fechaRecordatorio) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.NVarChar, ID_usuario)
      .input("tipoEntrenamiento", sql.NVarChar, tipoEntrenamiento)
      .input("horaRecordatorio", sql.Time, horaRecordatorio)
      .input("fechaRecordatorio", sql.Date, fechaRecordatorio)
      .input("fechaCreacion", sql.DateTime, new Date())
      .query(querysRecordatoriosUsuarios.addNewRecordatorioUsuario);

    const recordatorioId = result.recordset[0].ID_recordatorio;
    res.json({ msg: "Recordatorio creado exitosamente.", ID_recordatorio: recordatorioId });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getRecordatoriosUsuariosById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.NVarChar, req.params.id)
      .query(querysRecordatoriosUsuarios.getRecordatoriosUsuariosById);
    return res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllRecordatoriosByUserId = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.NVarChar, req.params.id)
      .query(querysRecordatoriosUsuarios.getAllRecordatoriosByUserId);
    return res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const updateRecordatorioUsuarioById = async (req, res) => {
  const { tipoEntrenamiento, horaRecordatorio, fechaRecordatorio } = req.body;
  if (!tipoEntrenamiento || !horaRecordatorio || !fechaRecordatorio) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_recordatorio", sql.Int, req.params.id)
      .input("tipoEntrenamiento", sql.NVarChar, tipoEntrenamiento)
      .input("horaRecordatorio", sql.Time, horaRecordatorio)
      .input("fechaRecordatorio", sql.Date, fechaRecordatorio)
      .query(querysRecordatoriosUsuarios.updateRecordatorioUsuarioById);
    return res.status(200).json({ msg: "Recordatorio actualizado exitosamente." });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteRecordatorioUsuarioById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_recordatorio", sql.Int, req.params.id)
      .query(querysRecordatoriosUsuarios.deleteRecordatorioUsuario);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
