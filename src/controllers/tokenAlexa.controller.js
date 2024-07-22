import { getConnection, sql, querysTokensAlexa } from "../database";

export const getAllTokens = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysTokensAlexa.getAllTokens);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTokensByUsuario = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, req.params.id)
      .query(querysTokensAlexa.getTokensByUsuario);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addNuevoToken = async (req, res) => {
  const { ID_usuario, fechaGeneracion, token } = req.body;

  console.log(req.body)

  if (ID_usuario == null || fechaGeneracion == null || token == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("fechaGeneracion", sql.VarChar, fechaGeneracion)
      .input("token", sql.Int, token)
      .query(querysTokensAlexa.addNuevoToken);
    res.json({ ID_usuario, fechaGeneracion, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTokenById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_token", sql.Int, req.params.id)
      .query(querysTokensAlexa.getTokenById);
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteTokenById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_token", sql.Int, req.params.id)
      .query(querysTokensAlexa.deleteTokenById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateTokenByUsuario = async (req, res) => {
  const { token, fechaGeneracion } = req.body;

  if (token == null || fechaGeneracion == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_usuario", sql.Int, req.params.id)
      .input("token", sql.Int, token)
      .input("fechaGeneracion", sql.VarChar, fechaGeneracion)
      .query(querysTokensAlexa.updateTokenByUsuario);
    res.json({ token, fechaGeneracion });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const validarToken = async (req, res) => {
    const { token } = req.params;
  
    if (token == null) {
      return res.status(400).json({ msg: 'Bad Request. Please provide a token' });
    }
  
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("token", sql.Int, token)
        .query(querysTokensAlexa.validarToken);
      if (result.recordset.length > 0) {
        return res.json(result.recordset[0]);
      } else {
        return res.status(404).json({ msg: 'Token not valid' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
