import { getConnection, querysDireccionEnvioPredeterminada, sql } from "../database";

export const setDireccionPredeterminada = async (req, res) => {
  const { ID_usuario, ID_direccion } = req.body;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_direccion", sql.Int, ID_direccion)
      .query(querysDireccionEnvioPredeterminada.setDireccionPredeterminada);

    res.status(200).json({ msg: "Dirección predeterminada actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la dirección predeterminada:", error.message);
    res.status(500).json({ msg: "Error al actualizar la dirección predeterminada" });
  }
};

export const getDireccionPredeterminadaByUserID = async (req, res) => {
  const { ID_usuario } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysDireccionEnvioPredeterminada.getDireccionPredeterminadaByUserID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Dirección predeterminada no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener la dirección predeterminada:", error.message);
    res.status(500).json({ msg: "Error al obtener la dirección predeterminada" });
  }
};