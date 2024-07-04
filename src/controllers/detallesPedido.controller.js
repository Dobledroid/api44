import { getConnection, querysDetallesPedido, sql } from "../database";

export const getDetallesPedidosByIdUser = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", req.params.ID_usuario)
      .query(querysDetallesPedido.getDetallesPedidosByIdUser);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getDetallesPedidoByPedidoID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_pedido", req.params.ID_pedido)
      .query(querysDetallesPedido.getDetallesPedidoByPedidoID);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getItemsDetallesOrdenByUserID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, req.params.ID_pedido)
      .query(querysDetallesPedido.getItemsDetallesOrdenByUserID);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const addNewDetallePedido = async (req, res) => {
  const { ID_pedido, ID_producto, cantidad, precioUnitario } = req.body;
  console.log(req.body);

  if (
    ID_pedido == null ||
    ID_producto == null ||
    cantidad == null ||
    precioUnitario == null
  ) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione todos los campos requeridos' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .input("ID_producto", sql.Int, ID_producto)
      .input("cantidad", sql.Int, cantidad)
      .input("precioUnitario", sql.Decimal(10, 2), precioUnitario)
      .query(querysDetallesPedido.addNewDetallePedido);

    console.log("Detalle de pedido añadido correctamente OK 200")
    // res.status(200).send("Detalle de pedido añadido correctamente");
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateDetallePedidoByID = async (req, res) => {
  const {
    ID_pedido,
    ID_producto,
    cantidad,
    precioUnitario,
    ID_detalle
  } = req.body;

  if (
    ID_pedido == null ||
    ID_producto == null ||
    cantidad == null ||
    precioUnitario == null
  ) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione todos los campos requeridos' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .input("ID_producto", sql.Int, ID_producto)
      .input("cantidad", sql.Int, cantidad)
      .input("precioUnitario", sql.Decimal(10, 2), precioUnitario)
      .input("ID_detalle", req.params.ID_detalle)
      .query(querysDetallesPedido.updateDetallePedidoByID);
    res.status(200).send("Detalle de pedido actualizado correctamente");
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const deleteDetallePedidoByID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_detalle", req.params.ID_detalle)
      .query(querysDetallesPedido.deleteDetallePedidoByID);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};
