import moment from 'moment-timezone';
import { getConnection, querysOrdenesPedidos, sql } from "../database";

export const getAllOrdenesPedido = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.query(querysOrdenesPedidos.getAllOrdenesPedido);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "No se encontraron órdenes de pedido" });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener todas las órdenes de pedido:", error.message);
    res.status(500).json({ msg: "Error al obtener todas las órdenes de pedido" });
  }
};
export const addNewOrdenPedido = async (req, res) => {
  const { ID_usuario, fecha, total, operacion_id, operacion_status, ID_direccion } = req.body;
  if (
    ID_usuario == null ||
    fecha == null ||
    total == null ||
    operacion_id == null ||
    operacion_status == null ||
    ID_direccion == null
  ) {
    console.error("Error: Datos incompletos");
    return res.status(400).json({ msg: "Datos incompletos" });
  }

  try {
    const pool = await getConnection();
    const formattedFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("fecha", sql.DateTime, formattedFecha)
      .input("total", sql.Decimal(10, 2), total)
      .input("operacion_id", sql.NVarChar, operacion_id)
      .input("operacion_status", sql.NVarChar, operacion_status)
      .input("ID_direccion", sql.Int, ID_direccion)
      .query(querysOrdenesPedidos.addNewOrdenPedido);

    const insertedID = result.recordset[0].ID_pedido;


    console.log("Orden de pedido añadido correctamente OK 200")
    return insertedID;
  } catch (error) {
    console.error("Error al añadir la orden de pedido y detalle:", error.message);
    res.status(500).json({ msg: "Error al añadir la orden de pedido y detalle" });
  }
};



export const getOrdenPedidoByUserID = async (req, res) => {
  const { ID_usuario } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysOrdenesPedidos.getOrdenPedidoByUserID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "No se encontraron órdenes de pedido para este usuario" });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener las órdenes de pedido:", error.message);
    res.status(500).json({ msg: "Error al obtener las órdenes de pedido" });
  }
};

export const getOrdenPedidoByID = async (req, res) => {
  const { ID_pedido } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .query(querysOrdenesPedidos.getOrdenPedidoByID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "No se encontró la orden de pedido" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al obtener la orden de pedido" });
  }
};

export const getDetallesOrdenPetidoByID = async (req, res) => {
  const { ID_pedido } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .query(querysOrdenesPedidos.getDetallesOrdenPetidoByID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "No se encontró la orden de pedido" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al obtener la orden de pedido" });
  }
};

export const updateOrdenPedidoByID = async (req, res) => {
  const { ID_pedido } = req.params;
  const { ID_usuario, fecha, estado, total, operacion_id, operacion_status } = req.body;

  try {
    const pool = await getConnection();

    const formattedFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("fecha", sql.DateTime, formattedFecha)
      .input("estado", sql.NVarChar, estado)
      .input("total", sql.Decimal(10, 2), total)
      .input("operacion_id", sql.Int, operacion_id)
      .input("operacion_status", sql.NVarChar, operacion_status)
      .query(querysOrdenesPedidos.updateOrdenPedidoByID);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "No se encontró la orden de pedido" });
    }

    res.json({ msg: "Orden de pedido actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al actualizar la orden de pedido" });
  }
};

export const deleteOrdenPedidoByID = async (req, res) => {
  const { ID_pedido } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .query(querysOrdenesPedidos.deleteOrdenPedidoByID);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "No se encontró la orden de pedido" });
    }

    res.json({ msg: "Orden de pedido eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al eliminar la orden de pedido" });
  }
};

export const existeUnOrdenPedidoByID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ID_pedido', req.params.id)
      .query(querysOrdenesPedidos.existeUnOrdenPedidoByID);

    if (result.recordset.length > 0) {
      const existeRegistro = result.recordset[0].existeRegistro === 1;
      res.json({ existeRegistro });
    } else {
      res.json({ existeRegistro: false });
    }
  } catch (error) {
    console.error('Error al verificar si existe una orden pedido:', error.message);
    res.status(500).json({ error: 'Error al verificar la existencia de una orden pedido' });
  }
};