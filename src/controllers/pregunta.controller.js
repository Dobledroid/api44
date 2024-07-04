import { getConnection, querysPregunta} from "../database";

export const getPreguntas = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querysPregunta.getAllPreguntas);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(escapeHtml(error.message));
    }
  };
  
  export const getPreguntaByIdUser = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("IdUsuario", req.params.id)
        .query(querysPregunta.getPreguntaByIdUser);
  
      // Verificar si hay resultados
      if (result.recordset.length > 0) {
        return res.json(result.recordset[0]);
      } else {
        // Si no hay resultados, devolver un mensaje indicando que no se encontraron datos
        return res.status(404).json({ message: "No se encontraron preguntas para el usuario proporcionado." });
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la ejecución de la consulta
      console.error("Error al obtener la pregunta:", error);
      return res.status(500).json({ message: "Ocurrió un error al procesar la solicitud." });
    }
  };

  export const insertarPregunta = async (req, res) => {
    const { idUsuario, pregunta, respuesta } = req.body;
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("IdUsuario", idUsuario)
        .input("pregunta", pregunta)
        .input("respuesta", respuesta)
        .query(querysPregunta.insertarPregunta);
  
      res.json({ message: "Pregunta secreta insertada correctamente." });
    } catch (error) {
      console.error("Error al insertar la pregunta:", error);
      res.status(500).json({ message: "Ocurrió un error al insertar la pregunta." });
    }
  };

  export const buscarPregunta = async (req, res) => {
    const { idUsuario, pregunta, respuesta } = req.body;
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("IdUsuario", idUsuario)
        .input("pregunta", pregunta)
        .input("respuesta", respuesta)
        .query(querysPregunta.getPreguntaByUserAndDetails);
  
      // Verificar si hay resultados
      if (result.recordset.length > 0) {
        return res.json(result.recordset[0]); // Devolver los datos encontrados
      } else {
        return res.status(404).json({ message: "No se encontraron preguntas." });
      }
    } catch (error) {
      console.error("Error al buscar la pregunta secreta:", error);
      return res.status(500).json({ message: "Ocurrió un error al buscar la pregunta secreta." });
    }
  };