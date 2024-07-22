const express = require('express');
const { procesarPago } = require('../controllers/payment_stripe.controllers');
const router = express.Router();

router.post('/procesar-pago', procesarPago);

module.exports = router;
