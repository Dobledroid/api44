import moment from 'moment-timezone';
import { getConnection, querysMembresiasUsuarios, sql } from "../database";


export const getAllMembresiaUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysMembresiasUsuarios.getAllMembresiasUsers);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(escapeHtml(error.message));
  }
};

export const getMembresiaUsuarioByUserId = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", req.params.id)
      .query(querysMembresiasUsuarios.getMembresiaUsuarioByUserId);
    
    const users = result.recordset; // Cambio aquí
    
    return res.status(200).json(users); // Cambio aquí
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getMembresiaUsuarioByIDUnicoMembresia = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_UnicoMembresia", req.params.ID_UnicoMembresia)
      .query(querysMembresiasUsuarios.getMembresiaUsuarioByIDUnicoMembresia);
    
      console.log(result.recordset)
    const users = result.recordset;
    
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getMembresiaUsuarioByUserIdAndType = async (userID, tipoMembresiaID) => {
  //  console.log("params_getMembresiaUsuarioByUserIdAndType", userID, tipoMembresiaID)
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", userID)
      .input("ID_tipoMembresia", tipoMembresiaID)
      .query(querysMembresiasUsuarios.getMembresiaUsuarioByUserIdAndTypeId);
    console.log("response_getMembresiaUsuarioByUserIdAndType", result.recordset[0])
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error al obtener el historial de membresía por ID de usuario y tipo de membresía');
  }
};

export const addNewMembresiaUsuario = async (req, res) => {
  // console.log("paramets_addNewMembresiaUsuario", req.body)
  const { ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, imagenUrl } = req.body;
  
  if (ID_usuario == null || ID_tipoMembresia == null || fechaInicio == null || fechaVencimiento == null || imagenUrl == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione todos los campos requeridos' });
  }
  // Formatear las fechas y restar 6 horas
  const fechaInicioFormateada = moment(fechaInicio).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
  const fechaVencimientoFormateada = moment(fechaVencimiento).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
  // console.log("fechaInicioFormateada",fechaInicioFormateada)
  // console.log("fechaVencimientoFormateada",fechaVencimientoFormateada)

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_tipoMembresia", sql.Int, ID_tipoMembresia)
      .input("fechaInicio", sql.DateTime, fechaInicioFormateada)
      .input("fechaVencimiento", sql.DateTime, fechaVencimientoFormateada)
      .input("imagenUrl", sql.VarChar, imagenUrl)
      .query(querysMembresiasUsuarios.addNewMembresiaUsuario);
    
    const insertedID = result.recordset[0].ID_membresiaUsuario;
      
    console.log("response_addNewMembresiaUsuario OK 200");
    return insertedID;
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const deleteMembresiaUsuarioById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUsuario", req.params.id)
      .query(querysMembresiasUsuarios.deleteMembresiaUsuarioById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateMembresiaUsuarioById = async (req, res) => {
  // console.log("paramets_updateMembresiaUsuarioById", req.body)

  const { ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, imagenUrl } = req.body;

  if (ID_usuario == null || ID_tipoMembresia == null || fechaInicio == null || fechaVencimiento == null || imagenUrl == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  const fechaInicioFormateada = moment(fechaInicio).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
  const fechaVencimientoFormateada = moment(fechaVencimiento).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_tipoMembresia", sql.Int, ID_tipoMembresia)
      .input("fechaInicio", sql.DateTime, fechaInicioFormateada)
      .input("fechaVencimiento", sql.DateTime, fechaVencimientoFormateada)
      .input("imagenUrl", sql.VarChar, imagenUrl)
      .input("ID_membresiaUsuario", req.params.id)
      .query(querysMembresiasUsuarios.updateMembresiaUsuarioById);
      console.log("response_updateMembresiaUsuarioById OK 200")
      // res.json({ ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateMembresiaUsuarioByIdActualizar = async (req, res) => {
  // console.log("paramets_updateMembresiaUsuarioById", req.body)

  const { ID_membresiaUsuario, ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, imagenUrl } = req.body;

  console.log(req.body);

  if (ID_membresiaUsuario == null, ID_usuario == null || ID_tipoMembresia == null || fechaInicio == null || fechaVencimiento == null || imagenUrl == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  const fechaInicioFormateada = moment(fechaInicio).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
  const fechaVencimientoFormateada = moment(fechaVencimiento).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
  console.log("fechaInicioFormateada", fechaInicioFormateada)
  console.log("fechaVencimientoFormateada", fechaVencimientoFormateada)
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("ID_tipoMembresia", sql.Int, ID_tipoMembresia)
      .input("fechaInicio", sql.DateTime, fechaInicioFormateada)
      .input("fechaVencimiento", sql.DateTime, fechaVencimientoFormateada)
      .input("imagenUrl", sql.VarChar, imagenUrl)
      .input("ID_membresiaUsuario", sql.Int, ID_membresiaUsuario)
      .query(querysMembresiasUsuarios.updateMembresiaUsuarioById);
      console.log("updateMembresiaUsuarioByIdActualizar OK 200")
      // res.json({ ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const existeUnaMembresiaUsuarioByID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ID_membresiaUsuario', req.params.id)
      .query(querysMembresiasUsuarios.existeUnaMembresiaUsuarioByID);

    if (result.recordset.length > 0) {
      const existeRegistro = result.recordset[0].existeRegistro === 1;
      res.json({ existeRegistro });
    } else {
      res.json({ existeRegistro: false });
    }
  } catch (error) {
    console.error('Error al verificar si existe un producto en el carrito:', error.message);
    res.status(500).json({ error: 'Error al verificar la existencia del producto en el carrito' }); // Enviar error al cliente
  }
};


export const existeUnaMembresiaUsuarioByIDMembresiaTodo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ID_membresiaUsuario', req.params.id)
      .query(querysMembresiasUsuarios.existeUnaMembresiaUsuarioByIDMembresiaTodo);

      if (result.recordset.length > 0) {
        res.json(result.recordset);
      } else {
        res.status(404).json({ m: 'No se encontro' });
      }
  } catch (error) {
    console.error('Error al verificar si existe un producto en el carrito:', error.message);
    res.status(500).json({ error: 'Error al verificar la existencia del producto en el carrito' }); // Enviar error al cliente
  }
};

export const getDetalleMembresiaSkill = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, req.params.id)
      .query(querysMembresiasUsuarios.detalleMembresiaSkill);
    
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'No se encontró la membresía.' });
    }
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};