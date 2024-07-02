// import { getConnection, querysUsers, sql } from "../database";
// const bcrypt = require('bcrypt');

// export const getUsers = async (req, res) => {
//   try {
//     const pool = await getConnection();
//     const result = await pool.request().query(querysUsers.getAllUsers);
//     res.json(result.recordset);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

// export const createNewUser = async (req, res) => {
//   const { nombre, primerApellido, segundoApellido, fechaNacimiento, genero, correoElectronico, telefono, contrasena, direccion } = req.body;

//   if ((nombre == null || primerApellido == null || segundoApellido == null || fechaNacimiento == null || genero == null || correoElectronico == null || telefono == null || contrasena == null || direccion == null) ||
//     (nombre === '' || primerApellido === '' || segundoApellido === '' || fechaNacimiento === '' || genero === '' || correoElectronico === '' || telefono == null || contrasena === '' || direccion === '')) {
//     return res.status(400).json({ msg: "Solicitud incorrecta. Por favor complete todos los campos" });
//   }

//   try {
//     const pool = await getConnection();

//     const existingUser = await pool
//       .request()
//       .input("correoElectronico", sql.VarChar, correoElectronico)
//       .query(querysUsers.getUserByEmail);
//     const existingUserTelephone = await pool
//       .request()
//       .input("telefono", sql.VarChar, telefono)
//       .query(querysUsers.getUserByTelephone);

//     if (existingUser.recordset.length > 0) {
//       return res.status(409).json({ msg: "Un usuario con ese correo ya existe" });
//     }
    
//     if (existingUserTelephone.recordset.length > 0) {
//       return res.status(409).json({ msg: "Un usuario con ese teléfono ya existe" });
//     }

//     const hashedPassword = await bcrypt.hash(contrasena, 10);

//     await pool
//       .request()
//       .input("nombre", sql.VarChar, nombre)
//       .input("primerApellido", sql.VarChar, primerApellido)
//       .input("segundoApellido", sql.VarChar, segundoApellido)
//       .input("fechaNacimiento", sql.Date, fechaNacimiento)
//       .input("genero", sql.VarChar, genero)
//       .input("correoElectronico", sql.VarChar, correoElectronico)
//       .input("telefono", sql.BigInt, telefono)
//       .input("contraseña", sql.VarChar, hashedPassword) // Se almacena la contraseña hasheada
//       .input("direccion", sql.VarChar, direccion)
//       .query(querysUsers.addNewUser);

//     res.json({ nombre, primerApellido, segundoApellido, fechaNacimiento, genero, correoElectronico, telefono, contrasena: hashedPassword, direccion });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };



// export const getUserById = async (req, res) => {
//   try {
//     const pool = await getConnection();
//     const result = await pool
//       .request()
//       .input("IdUsuario", req.params.id)
//       .query(querysUsers.getUserById);
//     return res.json(result.recordset[0]);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

// export const getUserByEmail = async (req, res) => {
//   const { email } = req.params;

//   if (email == null || email === '') {
//     return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione un correo electrónico' });
//   }

//   try {
//     const pool = await getConnection();
//     const result = await pool
//       .request()
//       .input('correoElectronico', sql.VarChar, email)
//       .query(querysUsers.getUserByEmail);

//     if (result.recordset.length === 0) {
//       return res.status(404).json({ msg: 'Usuario no encontrado' });
//     }
    
//     const user = result.recordset[0];
//     return res.status(200).json(user);

//   } catch (error) {
//     res.status(500).json({ msg: 'Error interno del servidor' });
//   }
// };

// export const deleteUserById = async (req, res) => {
//   try {
//     const pool = await getConnection();

//     const result = await pool
//       .request()
//       .input("IdUsuario", req.params.id)
//       .query(querysUsers.deleteUser);

//     if (result.rowsAffected[0] === 0) return res.sendStatus(404);

//     return res.sendStatus(204);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

// export const getTotalUsers = async (req, res) => {
//   const pool = await getConnection();

//   const result = await pool.request().query(querysUsers.getTotalUsers);
//   res.json(result.recordset[0][""]);
// };

// export const updateUserById = async (req, res) => {
//   const { nombre, primerApellido, segundoApellido, fechaNacimiento, genero, correoElectronico, telefono, contrasena, direccion } = req.body;

//   if ((nombre == null || primerApellido == null || segundoApellido == null || fechaNacimiento == null || genero == null || correoElectronico == null || telefono == null || contrasena == null || direccion == null) ||
//       (nombre == '' || primerApellido == '' || segundoApellido == '' || fechaNacimiento == '' || genero == '' || correoElectronico == '' || telefono == null || contrasena == null || direccion == '')) {
//     return res.status(400).json({ msg: "Solicitud incorrecta. Por favor complete todos los campos" });
//   }

//   try {
//     const pool = await getConnection();
//     await pool
//       .request()
//       .input("nombre", sql.VarChar, nombre)
//       .input("primerApellido", sql.VarChar, primerApellido)
//       .input("segundoApellido", sql.VarChar, segundoApellido)
//       .input("fechaNacimiento", sql.Date, fechaNacimiento)
//       .input("genero", sql.VarChar, genero)
//       .input("correoElectronico", sql.VarChar, correoElectronico)
//       .input("telefono", sql.BigInt, telefono)
//       .input("contraseña", sql.VarChar, contrasena)
//       .input("direccion", sql.VarChar, direccion)
//       .query(querysUsers.updateUserById);
//     res.json({ nombre, primerApellido, segundoApellido, fechaNacimiento, genero, correoElectronico, telefono, contrasena, direccion });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

// export const updatePasswordById = async (req, res) => {
//   const { contraseña } = req.body;

//   if (contraseña == null) {
//     return res.status(400).json({ msg: "Solicitud incorrecta. Por favor proporcione una contraseña" });
//   }

//   try {
//     const pool = await getConnection();

//     await pool
//       .request()
//       .input("contraseña", sql.VarChar, contraseña)
//       .input("IdUsuario", req.params.id)
//       .query(querysUsers.updatePasswordById);

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const login = async (req, res) => {
//   const { correoElectronico, contraseña } = req.body;

//   if ((correoElectronico == null || contraseña == null) || (correoElectronico == '' || contraseña == '')) {
//     return res.status(400).json({ msg: "Solicitud incorrecta. Por favor proporcione tanto el correo electrónico como la contraseña" });
//   }
//   try {
//     const pool = await getConnection();

//     const result = await pool
//       .request()
//       .input("correoElectronico", sql.VarChar, correoElectronico)
//       .input("contraseña", sql.VarChar, contraseña)
//       .query(querysUsers.login);

//     if (result.recordset.length === 0) {
//       return res.status(401).json({ msg: "Correo electrónico o contraseña no válidos" });
//     }

//     const user = result.recordset[0];

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ msg: "Error interno del servidor", error: error.message });
//   }
// };
