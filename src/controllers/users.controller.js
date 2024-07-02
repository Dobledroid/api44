import { getConnection, querysUsers, sql } from "../database";
import { addNewEstadoCuenta, getEstadoCuentaByUserId, updateIntentosFallidos, bloquearCuenta, desbloquearCuenta } from "../controllers/estadoCuenta.controller";
import { addNewEstadoUsuario } from "../controllers/estadoUsuario.controller";
import { enviarCorreoBloqueado, enviarCorreoBloquear, enviarCorreoNuevoInicioSesion } from "../controllers/send.controlller";

import bcrypt from 'bcrypt';
const moment = require('moment-timezone');
const axios = require('axios');

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysUsers.getAllUsers);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewUser = async (req, res) => {
  const { nombre, primerApellido, segundoApellido, correoElectronico, contrasena } = req.body;

  if (!nombre || !primerApellido || !segundoApellido || !correoElectronico || !contrasena) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();

    const existingCredential = await pool
      .request()
      .input("correoElectronico", sql.VarChar, correoElectronico)
      .query(querysUsers.getCredentialByEmail);

    if (existingCredential.recordset.length > 0) {
      return res.status(409).json({ msg: "El correo electrónico ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10); // 10 es el costo de hash

    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("primerApellido", sql.VarChar, primerApellido)
      .input("segundoApellido", sql.VarChar, segundoApellido)
      .input("correoElectronico", sql.VarChar, correoElectronico)
      .query(querysUsers.addNewUser);

    const userId = result.recordset[0].ID_usuario;

    await pool
      .request()
      .input("ID_usuario", sql.Int, userId)
      .input("correoElectronico", sql.VarChar, correoElectronico)
      .input("contraseña", sql.VarChar, hashedPassword)
      .query(querysUsers.addNewCredential);


    const estado = 1;
    const descripcion = "Activo";
    await addNewEstadoCuenta({ body: { ID_usuario: userId, estado, descripcion } });
    await addNewEstadoUsuario({ body: { ID_usuario: userId, estado, descripcion } });
    res.json({ msg: "Usuario creado exitosamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUsuario", req.params.id)
      .query(querysUsers.getUserById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  if (email == null || email === '') {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione un correo electrónico' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('correoElectronico', sql.VarChar, email)
      .query(querysUsers.getUserByEmail);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const user = result.recordset[0];
    return res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdUsuario", req.params.id)
      .query(querysUsers.deleteUser);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalUsers = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querysUsers.getTotalUsers);
  res.json(result.recordset[0][""]);
};

export const updateUserById = async (req, res) => {
  const { nombre, primerApellido, segundoApellido, fechaNacimiento, genero, correoElectronico, telefono, contrasena, direccion } = req.body;

  if ((nombre == null || primerApellido == null || segundoApellido == null || fechaNacimiento == null || genero == null || correoElectronico == null || telefono == null || contrasena == null || direccion == null) ||
    (nombre == '' || primerApellido == '' || segundoApellido == '' || fechaNacimiento == '' || genero == '' || correoElectronico == '' || telefono == null || contrasena == null || direccion == '')) {
    return res.status(400).json({ msg: "Solicitud incorrecta. Por favor complete todos los campos" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("primerApellido", sql.VarChar, primerApellido)
      .input("segundoApellido", sql.VarChar, segundoApellido)
      .input("fechaNacimiento", sql.Date, fechaNacimiento)
      .input("genero", sql.VarChar, genero)
      .input("correoElectronico", sql.VarChar, correoElectronico)
      .input("telefono", sql.BigInt, telefono)
      .input("contraseña", sql.VarChar, contrasena)
      .input("direccion", sql.VarChar, direccion)
      .query(querysUsers.updateUserById);
    res.json({ nombre, primerApellido, segundoApellido, fechaNacimiento, genero, correoElectronico, telefono, contrasena, direccion });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updatePasswordById = async (req, res) => {
  const { contraseña } = req.body;

  if (contraseña == null) {
    return res.status(400).json({ msg: "Solicitud incorrecta. Por favor proporcione una contraseña" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10); // Hashear la contraseña con un costo de 10
    const pool = await getConnection();

    await pool
      .request()
      .input("contraseña", sql.VarChar, hashedPassword) // Pasar la contraseña hasheada en lugar de la original
      .input("IdUsuario", req.params.id)
      .query(querysUsers.updatePasswordById);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  const { correoElectronico, contraseña } = req.body;

  if ((correoElectronico == null || contraseña == null) || (correoElectronico == '' || contraseña == '')) {
    return res.status(400).json({ msg: "Solicitud incorrecta. Por favor proporcione tanto el correo electrónico como la contraseña." });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("correoElectronico", sql.VarChar, correoElectronico)
      .query(querysUsers.getUserByEmail);

    if (result.recordset.length === 0) {
      return res.status(401).json({ msg: "Correo electrónico o contraseña no válidos." });
    }

    const user = result.recordset[0];

    const validarEstadoCuentaBloquedo = await getEstadoCuentaByUserId(user.ID_usuario);
    const validarEstadoCuenta = validarEstadoCuentaBloquedo[0];

    if (!validarEstadoCuenta.estado) {
      const horaActual = await obtenerHoraActual();
      const tiempoDesbloqueo = new Date(validarEstadoCuenta.tiempoDesbloqueo).toISOString();

      console.log(horaActual, ">", tiempoDesbloqueo)

      if (horaActual > tiempoDesbloqueo) {
        await desbloquearCuenta({ body: { ID_estadoCuenta: validarEstadoCuenta.ID_estadoCuenta } });
      } else {
        return res.status(401).json({ msg: "La cuenta está bloqueada. Para más información, verifica tu correo electrónico." });
      }
    }

    const estadoCuentaResponse = await getEstadoCuentaByUserId(user.ID_usuario);
    const estadoCuenta = estadoCuentaResponse[0];

    console.log("estadoCuenta", estadoCuenta)
    const hashedPassword = user.contraseña;
    const passwordMatch = await bcrypt.compare(contraseña, hashedPassword);

    if (!passwordMatch) {
      const tiempoBloqueoMinutos = 1;
      estadoCuenta.intentosFallidos += 1;
      const intentosFallidos = estadoCuenta.intentosFallidos;

      await updateIntentosFallidos({ body: { ID_estadoCuenta: estadoCuenta.ID_estadoCuenta, intentosFallidos: estadoCuenta.intentosFallidos } });

      const maxIntentosFallidos = 3;
      if (intentosFallidos >= maxIntentosFallidos) {

        await bloquearCuenta({ body: { ID_usuario: user.ID_usuario, tiempoBloqueoMinutos } });
        // Enviar correo electrónico sobre el bloqueo de la cuenta
        const estadoCuentaBloqueadaResponse = await getEstadoCuentaByUserId(user.ID_usuario);
        const estadoCuentaBloqueada = estadoCuentaBloqueadaResponse[0];
        
        
        await enviarCorreoBloqueado({ body: { tiempoBloqueo: estadoCuentaBloqueada.tiempoDesbloqueo, email: user.correoElectronico } });
        return res.status(401).json({ msg: `La cuenta está bloqueada debido a múltiples intentos fallidos de inicio de sesión. Debes esperar ${tiempoBloqueoMinutos} minutos.` });
      }
      if (intentosFallidos == 3) {
        // Enviar correo electrónico sobre el último intento de bloqueo de la cuenta
        await enviarCorreoBloquear({ body: { intentosFallidos, email: user.correoElectronico } });
        return res.status(401).json({ msg: `Correo electrónico o contraseña no válidos. Último intento para bloquear la cuenta: ${intentosFallidos}.` });
      }
      else {
        // Enviar correo electrónico sobre los intentos fallidos de inicio de sesión
        await enviarCorreoBloquear({ body: { intentosFallidos, email: user.correoElectronico } });
        return res.status(401).json({ msg: `Correo electrónico o contraseña no válidos. Intentos fallidos: ${intentosFallidos}.` });
      }
    }

    estadoCuenta.intentosFallidos = 0;
    await updateIntentosFallidos({ body: { ID_estadoCuenta: estadoCuenta.ID_estadoCuenta, intentosFallidos: estadoCuenta.intentosFallidos } });
    await enviarCorreoNuevoInicioSesion({ body: { email: user.correoElectronico } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

export const login_skill = async (req, res) => {
  
  const { correoElectronico, contraseña } = req.body;

  console.log(correoElectronico)
  console.log(contraseña)

  if ((correoElectronico == null || contraseña == null) || (correoElectronico == '' || contraseña == '')) {
    return res.status(400).json({ msg: "Solicitud incorrecta. Por favor proporcione tanto el correo electrónico como la contraseña." });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("correoElectronico", sql.VarChar, correoElectronico)
      .query(querysUsers.getUserByEmail);

    if (result.recordset.length === 0) {
      return res.status(401).json({ msg: "Correo electrónico o contraseña no válidos." });
    }

    const user = result.recordset[0];
    const hashedPassword = user.contraseña;
    const passwordMatch = await bcrypt.compare(contraseña, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Correo electrónico o contraseña no válidos." });
    }

    console.log("success")
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};


const obtenerHoraActual = async () => {
  try {
    const respuesta = await axios.get('http://worldtimeapi.org/api/timezone/America/Mexico_City');
    const horaActualCompleta = respuesta.data.datetime;
    return horaActualCompleta;
  } catch (error) {
    throw new Error('No se pudo obtener la hora actual desde la API de WorldTimeAPI');
  }
};
