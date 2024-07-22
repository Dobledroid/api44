// routes/payment_stripe.routes.js
const express = require('express');
const stripe = require('stripe')('sk_test_51PdbM8Hh07ihkU0MZKqwJewQxLstyyVZv5WMKNf53BfoOlf3baObdLdbvDrC5TPu3VsxTAL6ETzM3tHFYqZmnNtS00tjwnKNnS');
const router = express.Router();

// En routes/payment_stripe.routes.js
router.post('/procesar-pago', async (req, res) => {
  const { paymentMethodId, amount, currency } = req.body; // Obtener la moneda

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe maneja los montos en centavos
      currency: currency, // Usar la moneda recibida
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Error procesando el pago:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
