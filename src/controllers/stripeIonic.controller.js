const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Crear Payment Intent
export const createPaymentIntent = async (req, res) => {
    try {
      //CAMBIO VERCEL
      // Valores ficticios para probar el pago
      const amount = 1000; // Monto fijo (por ejemplo, 1000 centavos equivale a 10.00 MXN)
      const currency = 'mxn'; // Moneda fija (MXN)
  
      // Crear un Payment Intent con la cantidad y la moneda proporcionadas
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // El monto en la moneda mínima (por ejemplo, 1000 para 10.00 MXN)
        currency, // Debe coincidir con la moneda usada en el frontend
        payment_method_types: ['card'],
      });
  
      // Enviar el client secret al frontend
      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error al crear el Payment Intent:', error);
      res.status(500).send({ error: error.message });
    }
  };