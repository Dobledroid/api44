import express from 'express';
import Stripe from 'stripe';
import config from '../config';

const router = express.Router();
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

router.post('/payment_stripe', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    res.status(200).json({
      success: true,
      payment: paymentIntent,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
