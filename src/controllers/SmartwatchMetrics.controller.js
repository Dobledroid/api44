import { getConnection, querysSmartwatchMetrics, sql } from "../database";

export const getSmartwatchMetrics = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querysSmartwatchMetrics.getAllSmartwatchMetrics);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewSmartwatchMetrics = async (req, res) => {
  const { ID_usuarioSmartWatch, pasos, distancia, calorias_quemadas, frecuencia_cardiaca, saturacion_oxigeno, fecha } = req.body;

  if (!ID_usuarioSmartWatch || !pasos || !distancia || !calorias_quemadas || !frecuencia_cardiaca || !saturacion_oxigeno || !fecha) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuarioSmartWatch", sql.Int, ID_usuarioSmartWatch)
      .input("pasos", sql.Int, pasos)
      .input("distancia", sql.Float, distancia)
      .input("calorias_quemadas", sql.Float, calorias_quemadas)
      .input("frecuencia_cardiaca", sql.Int, frecuencia_cardiaca)
      .input("saturacion_oxigeno", sql.Float, saturacion_oxigeno)
      .input("fecha", sql.Date, fecha)
      .query(querysSmartwatchMetrics.addNewSmartwatchMetrics);

    const metricId = result.recordset[0].ID_metric;
    res.json({ msg: "Métrica de smartwatch creada exitosamente.", ID_metric: metricId });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getSmartwatchMetricsById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdMetric", req.params.id)
      .query(querysSmartwatchMetrics.getSmartwatchMetricsById);
    return res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateSmartwatchMetricsById = async (req, res) => {
  const { pasos, distancia, calorias_quemadas, frecuencia_cardiaca, saturacion_oxigeno, fecha } = req.body;
  if (!pasos || !distancia || !calorias_quemadas || !frecuencia_cardiaca || !saturacion_oxigeno || !fecha) {
    return res.status(400).json({ msg: "Por favor complete todos los campos." });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IdMetric", sql.Int, req.params.id)
      .input("pasos", sql.Int, pasos)
      .input("distancia", sql.Float, distancia)
      .input("calorias_quemadas", sql.Float, calorias_quemadas)
      .input("frecuencia_cardiaca", sql.Int, frecuencia_cardiaca)
      .input("saturacion_oxigeno", sql.Float, saturacion_oxigeno)
      .input("fecha", sql.Date, fecha)
      .query(querysSmartwatchMetrics.updateSmartwatchMetricsById);
    return res.status(200).json({ msg: "Métrica de smartwatch actualizada exitosamente." });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteSmartwatchMetricsById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdMetric", req.params.id)
      .query(querysSmartwatchMetrics.deleteSmartwatchMetrics);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getSmartwatchMetricsByUserId = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUsuarioSmartWatch", req.params.userId)
      .query(querysSmartwatchMetrics.getSmartwatchMetricsByUserId);
    return res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
