const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Crear Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    // Extraer el monto del cuerpo de la solicitud
    const { amount } = req.body;
    
    // Validar que el monto sea un número válido
    if (!amount || typeof amount !== 'number') {
      return res.status(400).send({ error: 'Monto inválido.' });
    }

    const currency = 'mxn'; // Moneda fija (MXN)

    // Crear un Payment Intent con la cantidad y la moneda proporcionadas
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
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
