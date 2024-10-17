import cloudinary from "cloudinary";
import fs from "fs";
import { getConnection, sql } from "../database";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const handleUserImageUpload = async (req, res) => {
  try {
    const { ID_usuario } = req.body;

    if (!ID_usuario) {
      return res.status(400).json({ msg: 'El ID del usuario es obligatorio' });
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'La imagen es obligatoria' });
    }

    // Subir la imagen directamente desde el buffer de memoria a Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "Usuarios_Imagenes", public_id: `Usuario_${ID_usuario}` },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
      uploadStream.end(req.file.buffer); // Transmitimos el buffer de la imagen a Cloudinary
    });

    const imagenUrl = result.secure_url;

    // Conexión a la base de datos
    const pool = await getConnection(); // Es importante usar 'await' para obtener la conexión a la base de datos

    const query = `
      MERGE usuario_imagen AS target
      USING (VALUES (@ID_usuario, @imagenUrl)) AS source (ID_usuario, url_imagen)
      ON target.ID_usuario = source.ID_usuario
      WHEN MATCHED THEN 
        UPDATE SET url_imagen = source.url_imagen
      WHEN NOT MATCHED THEN
        INSERT (ID_usuario, url_imagen) VALUES (source.ID_usuario, source.url_imagen);
    `;

    await pool.request()
      .input('ID_usuario', sql.Int, ID_usuario)
      .input('imagenUrl', sql.NVarChar, imagenUrl)
      .query(query);

    res.status(200).json({ message: 'Imagen subida correctamente', imagenUrl });

  } catch (error) {
    console.error('Error al subir la imagen de usuario:', error);
    res.status(500).json({ msg: error.message });
  }
};
export const getUserImageById = async (req, res) => {
    try {
      const { ID_usuario } = req.params;
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("ID_usuario", sql.Int, ID_usuario)
        .query("SELECT url_imagen FROM usuario_imagen WHERE ID_usuario = @ID_usuario");
  
      if (result.recordset.length > 0) {
        res.json({ imagenUrl: result.recordset[0].url_imagen });
      } else {
        res.status(404).json({ msg: 'No se encontró imagen para este usuario.' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Error al obtener la imagen del usuario' });
    }
  };