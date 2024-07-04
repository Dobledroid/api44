import { getConnection, querysEstadoCuenta, sql } from "../database";

export const getEstadoCuentaByUserId = async (ID_usuario) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", ID_usuario)
      .query(querysEstadoCuenta.getEstadoCuentaByUserId);
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const addNewEstadoCuenta = async (req, res) => {
  const { ID_usuario, estado, descripcion } = req.body;
  // console.log("ID_usuario, estado, descripcion", ID_usuario, estado, descripcion)
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
      .query(querysEstadoCuenta.addNewEstadoCuenta);
    //res.json({ ID_usuario, estado, descripcion });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const deleteEstadoCuentaById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_estadoCuenta", req.params.id)
      .query(querysEstadoCuenta.deleteEstadoCuentaById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateEstadoCuentaById = async (req, res) => {
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
      .input("ID_estadoCuenta", req.params.id)
      .query(querysEstadoCuenta.updateEstadoCuentaById);
    res.json({ estado, descripcion });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateIntentosFallidos = async (req, res) => {
  const { ID_estadoCuenta, intentosFallidos } = req.body;

  // console.log("ID_estadoCuenta, intentosFallidos", ID_estadoCuenta, intentosFallidos)

  if (ID_estadoCuenta == null || intentosFallidos == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide both ID_estadoCuenta and intentosFallidos' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_estadoCuenta", sql.Int, ID_estadoCuenta)
      .input("intentosFallidos", sql.Int, intentosFallidos)
      .query(querysEstadoCuenta.updateIntentosFallidos);
    // return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};


export const bloquearCuenta = async (req, res) => {
  const { ID_usuario, tiempoBloqueoMinutos } = req.body; // Agrega tiempoBloqueoMinutos como un nuevo campo en tu solicitud

  if (!ID_usuario || tiempoBloqueoMinutos == null) {
    return res.status(400).json({ msg: 'ID de usuario o tiempo de bloqueo no proporcionado' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", ID_usuario)
      .input("tiempoBloqueoMinutos", sql.Int, tiempoBloqueoMinutos) 
      .query(querysEstadoCuenta.bloquearCuenta);
    
    //res.json({ msg: "Cuenta bloqueada exitosamente" });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};



export const desbloquearCuenta = async (req, res) => {
  const { ID_estadoCuenta } = req.body;
  // console.log("desbloquearCuenta", ID_estadoCuenta)
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_estadoCuenta", ID_estadoCuenta)
      .query(querysEstadoCuenta.desbloquearCuenta);
    
    //res.json({ msg: "Cuenta desbloqueada exitosamente." });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};
