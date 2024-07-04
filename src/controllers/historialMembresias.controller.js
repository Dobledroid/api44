import moment from 'moment-timezone';
import { getConnection, querysHistorialMembresias, sql } from "../database";

export const getHistorialMembresiaByUserId = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUser", req.params.id)
      .query(querysHistorialMembresias.getHistorialMembresiaByUserId);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getTodasHistorialMembresiasByUsuarioID = async (req, res) => {
  // console.log("params_getTodasHistorialMembresiasByUsuarioID", req.body)
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", req.params.id)
      .query(querysHistorialMembresias.getTodasHistorialMembresiasByUsuarioID);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getItemDetalleIdMembresia = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_membresiaUsuario", sql.Int, req.params.id)
      .query(querysDetallesPedido.getItemsDetallesOrdenByUserID);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};


export const addNewHistorialMembresia = async (req, res) => {
  console.log("addNewHistorialMembresia", req.body)
  const {
    ID_usuario,
    ID_tipoMembresia,
    fechaInicio,
    fechaVencimiento,
    precio,
    operacion_id,
    operacion_status
  } = req.body;

  if (
    ID_usuario == null ||
    ID_tipoMembresia == null ||
    fechaInicio == null ||
    fechaVencimiento == null ||
    precio == null ||
    operacion_id == null ||
    operacion_status == null
  ) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione todos los campos requeridos' });
  }

  const fechaInicioFormateada = moment(fechaInicio).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
  const fechaVencimientoFormateada = moment(fechaVencimiento).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
  
  // console.log(fechaInicioFormateada, fechaVencimientoFormateada)
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_tipoMembresia", sql.Int, ID_tipoMembresia)
      .input("fechaInicio", sql.DateTime, fechaInicioFormateada)
      .input("fechaVencimiento", sql.DateTime, fechaVencimientoFormateada)
      .input("precio", sql.Decimal(10, 2), precio)
      .input("operacion_id", sql.NVarChar, operacion_id)
      .input("operacion_status", sql.NVarChar(50), operacion_status)
      .query(querysHistorialMembresias.addNewHistorialMembresia);

    console.log("addNewHistorialMembresia OK 200")
    // res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getHistorialMembresiaByUserIdAndTypeAndOperacionId = async (userID, tipoMembresiaID, operacion_id) => {
  try {
    // console.log("paramets_getHistorialMembresiaByUserIdAndTypeAndOperacionId", userID, tipoMembresiaID, operacion_id)
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", userID)
      .input("ID_tipoMembresia", tipoMembresiaID)
      .input("operacion_id", operacion_id)
      .query(querysHistorialMembresias.getHistoriallMembresiaByUserIdAndTypeIdAndOperacionId);
    // console.log("respons_getHistorialMembresiaByUserIdAndTypeAndOperacionId", result.recordset[0])
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error al obtener el historial de membresía por ID de usuario y tipo de membresía');
  }
};

export const getHistorialMembresiaByUserIdAndType = async (userID, tipoMembresiaID) => {
  try {
    // console.log("paramets_getHistorialMembresiaByUserIdAndType", userID, tipoMembresiaID)
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", userID)
      .input("ID_tipoMembresia", tipoMembresiaID)
      .query(querysHistorialMembresias.getHistoriallMembresiaByUserIdAndTypeId);
    // console.log("respons_getHistorialMembresiaByUserIdAndType", result.recordset[0])
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error al obtener el historial de membresía por ID de usuario y tipo de membresía');
  }
};

export const deleteHistorialMembresiaById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdHistorialMembresia", req.params.id)
      .query(querysHistorialMembresias.deleteHistorialMembresiaById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateHistorialMembresiaById = async (req, res) => {
  // console.log("updateHistorialMembresiaById", req.body)
  const { ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, precio } = req.body;
  if (ID_usuario == null || ID_tipoMembresia == null || fechaInicio == null || fechaVencimiento == null || precio == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione todos los campos requeridos' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_tipoMembresia", sql.Int, ID_tipoMembresia)
      .input("fechaInicio", sql.DateTime, fechaInicio)
      .input("fechaVencimiento", sql.DateTime, fechaVencimiento)
      .input("precio", sql.Decimal(10, 2), precio)
      .input("IdHistorialMembresia", req.params.id)
      .query(querysHistorialMembresias.updateHistorialMembresiaById);
    console.log("updateHistorialMembresiaById 200 OK")
      // res.json({ ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, precio });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};
