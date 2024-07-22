const stripe = require('stripe')('sk_test_51PdbM8Hh07ihkU0MZKqwJewQxLstyyVZv5WMKNf53BfoOlf3baObdLdbvDrC5TPu3VsxTAL6ETzM3tHFYqZmnNtS00tjwnKNnS');
const { updateItemQuantityByID_Orden } = require('./products.controller');
const { getItemsOrderByUserID, deleteItemsByUserID } = require('./carritoCompras.controller');
const { addNewOrdenPedido } = require('./ordenesPedidos.controller');
const { addNewDetallePedido } = require('./detallesPedido.controller');
const { obtenerFechaHoraActual } = require('../utilidades/dateUtils');

const procesarPago = async (req, res) => {
    const { paymentMethodId, amount, currency, ID_usuario, currentURL, ID_direccion } = req.body;
console.log(req.body)
    try {
        // Crear el Payment Intent con Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe maneja los montos en centavos
            currency: currency,
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });

        // Verificar si paymentIntent y su estado están definidos
        if (paymentIntent && paymentIntent.status) {
            if (paymentIntent.status === 'succeeded') {
                const fechaHoraActual = await obtenerFechaHoraActual();

                // Crear una nueva orden de pedido
                const ID_pedido = await addNewOrdenPedido({
                    body: {
                        ID_usuario: ID_usuario,
                        fecha: fechaHoraActual,
                        total: amount, // Aquí puedes ajustar el total si es necesario
                        operacion_id: paymentIntent.id,
                        operacion_status: paymentIntent.status,
                        ID_direccion: ID_direccion
                    }
                });

                try {
                    // Obtener los ítems del carrito del usuario
                    const items = await getItemsOrderByUserID(ID_usuario);

                    for (const item of items) {
                        const { ID_producto, cantidad, precioFinal } = item;

                        // Agregar detalles del pedido
                        await addNewDetallePedido({
                            body: {
                                ID_pedido: ID_pedido,
                                ID_producto,
                                cantidad,
                                precioUnitario: precioFinal
                            }
                        });

                        // Actualizar la cantidad del producto
                        await updateItemQuantityByID_Orden({
                            body: {
                                ID_producto,
                                cantidad
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error al agregar detalles de pedido:", error.message);
                    res.status(500).json({ msg: "Error al agregar detalles de pedido" });
                    return;
                }

                try {
                    // Eliminar los ítems del carrito del usuario
                    await deleteItemsByUserID(ID_usuario);
                    console.log("Carrito eliminado correctamente");
                } catch (error) {
                    console.error("Error al eliminar el carrito:", error.message);
                    res.status(500).json({ msg: "Error al eliminar el carrito" });
                    return;
                }

                // Construir la URL de redirección
                const parametros = `/${ID_pedido}/1`;
                const nuevaURL = currentURL + "/compra-finalizada" + parametros;

                res.json({ success: true, paymentIntent, redirectURL: nuevaURL });
            } else {
                res.status(400).json({ message: "El pago no se completó correctamente" });
            }
        } else {
            res.status(400).json({ message: "El Payment Intent no está disponible o su estado es desconocido" });
        }
    } catch (error) {
        console.error('Error procesando el pago:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    procesarPago,
};
