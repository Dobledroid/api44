import { Router } from 'express';
import {
  obtenerHoraActual,
  obtenerFechaHoraActual,
  obtenerFechaActual,
  sumarMinutos,
  sumarHoras,
  sumarDias,
  calcularMes,
  sumarMeses,
  calcularFechaVencimiento,
} from '../utilidades/dateUtils.js';

const router = Router();

router.get('/hora-actual', async (req, res) => {
  try {
    const horaActual = await obtenerHoraActual();
    res.json({ horaActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/fecha-hora-actual', async (req, res) => {
  try {
    const fechaHoraActual = await obtenerFechaHoraActual();
    res.json({ fechaHoraActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/fecha-actual', async (req, res) => {
  try {
    const fechaActual = await obtenerFechaActual();
    res.json({ fechaActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sumar-minutos', async (req, res) => {
  const { minutos } = req.body;
  try {
    const nuevaFecha = await sumarMinutos(minutos);
    res.json({ nuevaFecha });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sumar-horas', async (req, res) => {
  const { horas } = req.body;
  try {
    const nuevaFecha = await sumarHoras(horas);
    res.json({ nuevaFecha });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sumar-dias', async (req, res) => {
  const { dias } = req.body;
  try {
    const nuevaFecha = await sumarDias(dias);
    res.json({ nuevaFecha });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/calcular-mes', async (req, res) => {
  try {
    const mesActual = await calcularMes();
    res.json({ mesActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sumar-meses', async (req, res) => {
  const { meses } = req.body;
  try {
    const nuevaFecha = await sumarMeses(meses);
    res.json({ nuevaFecha });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/calcular-fecha-vencimiento', async (req, res) => {
  try {
    const fechaVencimiento = await calcularFechaVencimiento();
    res.json({ fechaVencimiento });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
