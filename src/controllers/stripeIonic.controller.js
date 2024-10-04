const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { addNewOrdenPedido } = require('./ordenesPedidos.controller');
const { addNewDetallePedido } = require('./detallesPedido.controller');
const { getItemsOrderByUserID, deleteItemsByUserID } = require('./carritoCompras.controller');
const { updateItemQuantityByID_Orden } = require('./products.controller');

export const createPaymentIntent = async (req, res) => {
  try {
    console.log('Iniciando el proceso de createPaymentIntent...');

    const { amount } = req.body;
    console.log('Monto recibido:', amount);

    // Validación del monto
    if (!amount || typeof amount !== 'number') {
      console.error('Monto inválido:', amount);
      return res.status(400).send({ error: 'Monto inválido.' });
    }

    const currency = 'mxn'; 

    // Crear Payment Intent con Stripe
    console.log('Creando Payment Intent...');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency,
      payment_method_types: ['card'],
    });
    console.log('Payment Intent creado con éxito:', paymentIntent.id);

    // Devolver el client secret al frontend
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error al crear el Payment Intent:', error);
    res.status(500).send({ error: error.message });
  }
};


export const processPayment = async (req, res) => {
  try {
    console.log('Procesando el pago...');

    const { paymentIntentId, ID_usuario, ID_direccion, amount } = req.body;
    console.log("Datos recibidos ", paymentIntentId, ID_usuario, ID_direccion, amount);

    // Obtener el estado del Payment Intent
    console.log('Obteniendo el Payment Intent...');
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log('Estado del Payment Intent:', paymentIntent.status);

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('El Payment Intent ha sido completado exitosamente.');

      const fechaHoraActual = new Date().toISOString();

      // Crear una nueva orden de pedido
      console.log('Creando nueva orden de pedido...');
      const ID_pedido = await addNewOrdenPedido({
        ID_usuario,
        fecha: fechaHoraActual,
        total: amount,
        operacion_id: paymentIntent.id,
        operacion_status: paymentIntent.status,
        ID_direccion,
      });
      console.log('Orden de pedido creada con ID:', ID_pedido);

      // Obtener los ítems del carrito del usuario
      console.log('Obteniendo ítems del carrito del usuario...');
      const items = await getItemsOrderByUserID(ID_usuario);
      console.log('Ítems obtenidos:', items);

      // Agregar detalles del pedido
      for (const item of items) {
        console.log(`Agregando detalle del pedido para el producto ${item.ID_producto}...`);
        await addNewDetallePedido({
          ID_pedido,
          ID_producto: item.ID_producto,
          cantidad: item.cantidad,
          precioUnitario: item.precioFinal,
        });
        console.log(`Detalle del pedido agregado para el producto ${item.ID_producto}.`);

        // Actualizar la cantidad del producto
        console.log(`Actualizando la cantidad del producto ${item.ID_producto}...`);
        await updateItemQuantityByID_Orden({
          ID_producto: item.ID_producto,
          cantidad: item.cantidad,
        });
        console.log(`Cantidad del producto ${item.ID_producto} actualizada.`);
      }

      // Eliminar los ítems del carrito del usuario
      console.log('Eliminando ítems del carrito del usuario...');
      await deleteItemsByUserID(ID_usuario);
      console.log('Ítems del carrito eliminados.');

      res.status(200).send({ success: true });
    } else {
      console.error('El pago no se completó correctamente. Estado del Payment Intent:', paymentIntent?.status);
      res.status(400).json({ message: "El pago no se completó correctamente" });
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).send({ error: error.message });
  }
};
