import { getConnection, querysDireccionEnvio, querysDireccionEnvioPredeterminada, sql } from "../database";

export const addNewDireccion = async (req, res) => {
  const { ID_usuario, nombre, apellidos, pais, direccion, ciudad, colonia, estado, codigoPostal, telefono, referencias, predeterminado } = req.body;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("nombre", sql.NVarChar, nombre)
      .input("apellidos", sql.NVarChar, apellidos)
      .input("pais", sql.NVarChar, pais)
      .input("direccion", sql.NVarChar, direccion)
      .input("ciudad", sql.NVarChar, ciudad)
      .input("colonia", sql.NVarChar, colonia)
      .input("estado", sql.NVarChar, estado)
      .input("codigoPostal", sql.NVarChar, codigoPostal)
      .input("telefono", sql.NVarChar, telefono)
      .input("referencias", sql.NVarChar, referencias)
      .input("predeterminado", sql.Bit, predeterminado)
      .query(querysDireccionEnvio.addNewDireccion);

    const insertedID = result.recordset[0].ID_direccion; // Capturar el ID del registro insertado

    await setDireccionPredeterminada(ID_usuario, insertedID); // Llamar al método setDireccionPredeterminada

    res.status(200).json({ msg: "Dirección añadida correctamente", insertedID });
  } catch (error) {
    console.error("Error al añadir la dirección:", error.message);
    res.status(500).json({ msg: "Error al añadir la dirección" });
  }
};

export const setDireccionPredeterminada = async (ID_usuario, ID_direccion) => {
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_direccion", sql.Int, ID_direccion)
      .query(querysDireccionEnvioPredeterminada.upsertDireccionPredeterminada);

    console.log("Dirección predeterminada actualizada correctamente");
  } catch (error) {
    console.error("Error al actualizar la dirección predeterminada:", error.message);
    throw new Error("Error al actualizar la dirección predeterminada");
  }
};

export const getDireccionByID = async (req, res) => {
  const { ID_direccion } = req.params;
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_direccion", sql.Int, ID_direccion)
      .query(querysDireccionEnvio.getDireccionByID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Dirección no encontrada" });
    }
    
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener la dirección:", error.message);
    res.status(500).json({ msg: "Error al obtener la dirección" });
  }
};


export const getDireccionByUserID = async (req, res) => {
  const { ID_usuario } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysDireccionEnvio.getDireccionByUserID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Dirección no encontrada" });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener la dirección:", error.message);
    res.status(500).json({ msg: "Error al obtener la dirección" });
  }
};

export const updateDireccionByID = async (req, res) => {
  const { ID_direccion } = req.params;
  const { ID_usuario, nombre, apellidos, pais, direccion, ciudad, colonia, estado, codigoPostal, telefono, referencias } = req.body;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_direccion", sql.Int, ID_direccion)
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("nombre", sql.NVarChar, nombre)
      .input("apellidos", sql.NVarChar, apellidos)
      .input("pais", sql.NVarChar, pais)
      .input("direccion", sql.NVarChar, direccion)
      .input("ciudad", sql.NVarChar, ciudad)
      .input("colonia", sql.NVarChar, colonia)
      .input("estado", sql.NVarChar, estado)
      .input("codigoPostal", sql.NVarChar, codigoPostal)
      .input("telefono", sql.NVarChar, telefono)
      .input("referencias", sql.NVarChar, referencias)
      .query(querysDireccionEnvio.updateDireccionByID);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Dirección no encontrada" });
    }

    res.json({ msg: "Dirección actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la dirección:", error.message);
    res.status(500).json({ msg: "Error al actualizar la dirección" });
  }
};

export const deleteDireccionByID = async (req, res) => {
  const { ID_direccion } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_direccion", sql.Int, ID_direccion)
      .query(querysDireccionEnvio.deleteDireccionByID);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Dirección no encontrada" });
    }

    res.json({ msg: "Dirección eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la dirección:", error.message);
    res.status(500).json({ msg: "Error al eliminar la dirección" });
  }
};
