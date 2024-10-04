import { getConnection, querysCarritoCompras, sql } from "../database";

export const addItemToCart = async (req, res) => {
  const { ID_usuario, ID_producto, cantidad } = req.body;

  if (ID_usuario == null || ID_producto == null || cantidad == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID de usuario, el ID del producto y la cantidad.' });
  }

  try {
    const pool = await getConnection();

    const existingCartItem = await getCartItemByIds(pool, ID_usuario, ID_producto);

    if (existingCartItem) {
      await updateCartItem(pool, ID_usuario, ID_producto, cantidad);
      return res.status(200).json({ msg: 'Cantidad actualizada en el carrito exitosamente' });
    } else {
      await pool
        .request()
        .input("ID_usuario", sql.Int, ID_usuario)
        .input("ID_producto", sql.Int, ID_producto)
        .input("cantidad", sql.Int, cantidad)
        .query(querysCarritoCompras.addNewItem);

      return res.status(200).json({ msg: 'Artículo agregado al carrito exitosamente' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

// export const addItemToCart = async (req, res) => {
//   const { ID_usuario, ID_articulo, cantidad } = req.body;

//   if (ID_usuario == null || ID_articulo == null || cantidad == null) {
//     return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID de usuario, el ID del artículo y la cantidad.' });
//   }

//   try {
//     const pool = await getConnection();

//     // Obtener el ID_producto y las existencias a partir del ID_articulo
//     const resultProducto = await pool
//       .request()
//       .input('ID_articulo', sql.NVarChar, ID_articulo)
//       .query('SELECT ID_producto, existencias FROM Productos WHERE ID_articulo = @ID_articulo');

//     if (resultProducto.recordset.length === 0) {
//       return res.status(404).json({ msg: 'Producto no encontrado' });
//     }

//     const { ID_producto, existencias } = resultProducto.recordset[0];

//     // Validar que la cantidad solicitada no exceda las existencias
//     if (cantidad > existencias) {
//       return res.status(400).json({ msg: `No es posible agregar la cantidad solicitada debido a la falta de existencias. Stock actual: ${existencias}` });
//     }

//     const existingCartItem = await getCartItemByIds(pool, ID_usuario, ID_producto);

//     if (existingCartItem) {
//       await updateCartItem(pool, ID_usuario, ID_producto, cantidad);
//       return res.status(200).json({ msg: 'Cantidad actualizada en el carrito exitosamente' });
//     } else {
//       await pool
//         .request()
//         .input("ID_usuario", sql.Int, ID_usuario)
//         .input("ID_producto", sql.Int, ID_producto)
//         .input("cantidad", sql.Int, cantidad)
//         .query(querysCarritoCompras.addNewItem);

//       return res.status(200).json({ msg: 'Artículo agregado al carrito exitosamente' });
//     }
//   } catch (error) {
//     console.error('Error al agregar el producto al carrito:', error);
//     return res.status(500).json({ msg: 'Error interno del servidor' });
//   }
// };


export const addItemToCartFromSkill = async (req, res) => {
  const { ID_usuario, ID_articulo, cantidad } = req.body;

  if (ID_usuario == null || ID_articulo == null || cantidad == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID de usuario, el ID del artículo y la cantidad.' });
  }

  try {
    const pool = await getConnection();

    // Obtener el ID_producto basado en el ID_articulo
    const productoResult = await pool
      .request()
      .input('ID_articulo', sql.NVarChar, ID_articulo)
      .query('SELECT ID_producto FROM Productos WHERE ID_articulo = @ID_articulo');

    if (productoResult.recordset.length === 0) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    const ID_producto = productoResult.recordset[0].ID_producto;

    const existingCartItem = await getCartItemByIds(pool, ID_usuario, ID_producto);

    if (existingCartItem) {
      await updateCartItem(pool, ID_usuario, ID_producto, cantidad);
      return res.status(200).json({ msg: 'Cantidad actualizada en el carrito exitosamente' });
    } else {
      await pool
        .request()
        .input("ID_usuario", sql.Int, ID_usuario)
        .input("ID_producto", sql.Int, ID_producto)
        .input("cantidad", sql.Int, cantidad)
        .query(querysCarritoCompras.addNewItem);

      return res.status(200).json({ msg: 'Artículo agregado al carrito exitosamente' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};


const getCartItemByIds = async (pool, ID_usuario, ID_producto) => {
  const result = await pool
    .request()
    .input("ID_usuario", sql.Int, ID_usuario)
    .input("ID_producto", sql.Int, ID_producto)
    .query(querysCarritoCompras.getCartItemByIds);

  return result.recordset.length > 0 ? result.recordset[0] : null;
};


const updateCartItem = async (pool, ID_usuario, ID_producto, cantidad) => {
  await pool
    .request()
    .input("ID_usuario", sql.Int, ID_usuario)
    .input("ID_producto", sql.Int, ID_producto)
    .input("cantidad", sql.Int, cantidad)
    .query(querysCarritoCompras.updateCartItem);
};


export const getItemsByUserID = async (req, res) => {
  const { ID_usuario } = req.params;
  if (ID_usuario == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione ID de usuario' });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysCarritoCompras.getItemsByUserID);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getItemsByID = async (req, res) => {
  const { ID_carrito } = req.params;

  if (ID_carrito == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione ID de usuario' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_carrito", sql.Int, ID_carrito)
      .query(querysCarritoCompras.getItemsByID);
    if (result.recordset.length > 0) {
      return res.json(result.recordset[0]); 
    } else {
      return res.status(404).json({ msg: 'No se encontraron elementos en el carrito con el ID proporcionado' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getItemsOrderByUserID = async (ID_usuario) => {
  if (ID_usuario == null) {
    throw new Error('ID de usuario no proporcionado');
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysCarritoCompras.getItemsOrderByUserID);
    return result.recordset;
  } catch (error) {
    throw new Error('Error al obtener los items del carrito de compras');
  }
};

export const deleteItemByID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_carrito", sql.Int, req.params.ID_carrito)
      .query(querysCarritoCompras.deleteItemByID);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    // console.log("ELIMINADO CORRECTAMENTE");
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteItemsByUserID = async (ID_usuario) => {
  console.log("deleteItemsByUserID ", ID_usuario);
  if (ID_usuario == null) {
    throw new Error('ID de usuario no proporcionado');
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysCarritoCompras.deleteItemsByUserID);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    console.log("ELIMINADO CORRECTAMENTE");
    // return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const updateItemQuantityByID = async (req, res) => {
  const { ID_carrito } = req.params;
  const { cantidad } = req.body;

  if (ID_carrito == null || cantidad == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID del artículo del carrito y la cantidad' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("cantidad", sql.Int, cantidad)
      .input("ID_carrito", sql.Int, ID_carrito)
      .query(querysCarritoCompras.updateItemQuantityByID);
    res.json({ msg: 'Cantidad de artículo actualizada correctamente' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalItemsByUserID = async (req, res) => {
  const { ID_usuario } = req.params;

  if (ID_usuario == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione ID de usuario' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ID_usuario', sql.Int, ID_usuario)
      .query(querysCarritoCompras.getTotalItemsByUserID);

      const totalProductosEnCarrito = result.recordset[0].totalProductosEnCarrito;
      const totalPrecio = result.recordset[0].totalPrecio || 0; 
      return res.json({ totalProductosEnCarrito, totalPrecio });
  } catch (error) {
    console.error('Error al obtener la cantidad total de productos en el carrito:', error.message);
    return res.status(500).json({ msg: 'Error al obtener la cantidad total de productos en el carrito' });
  }
};

export const existeUnProductoEnCarritoByUserIDProductID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ID_usuario', req.params.ID_usuario)
      .input('ID_producto', req.params.ID_producto)
      .query(querysCarritoCompras.existeUnProductoEnCarritoByUserIDProductID);

    if (result.recordset.length > 0) {
      const existeRegistro = result.recordset[0].existeRegistro === 1;
      const ID_carrito = result.recordset[0].ID_carrito;
      res.json({ existeRegistro, ID_carrito });
    } else {
      res.json({ existeRegistro: false, ID_carrito: null });
    }
  } catch (error) {
    console.error('Error al verificar si existe un producto en el carrito:', error.message);
    res.status(500).json({ error: 'Error al verificar la existencia del producto en el carrito' }); // Enviar error al cliente
  }
};

export const findByArticulo = async (req, res) => {
  const { ID_articulo } = req.params;
  if (ID_articulo == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID de artículo' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_articulo", sql.NVarChar, ID_articulo)
      .query('SELECT * FROM Productos WHERE ID_articulo = @ID_articulo');
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const existeUnArticuloEnCarritoByUserIDArticuloID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ID_usuario', sql.Int, req.params.ID_usuario)
      .input('ID_articulo', sql.NVarChar, req.params.ID_articulo)
      .query(querysCarritoCompras.existeUnArticuloEnCarritoByUserIDArticuloID);

    if (result.recordset.length > 0) {
      const existeRegistro = result.recordset[0].existeRegistro === 1;
      const ID_carrito = result.recordset[0].ID_carrito;
      res.json({ existeRegistro, ID_carrito });
    } else {
      res.json({ existeRegistro: false, ID_carrito: null });
    }
  } catch (error) {
    console.error('Error al verificar si existe un artículo en el carrito:', error.message);
    res.status(500).json({ error: 'Error al verificar la existencia del artículo en el carrito' });
  }
};


export const removeItemFromCartSkill = async (req, res) => {
  const { ID_usuario, ID_articulo } = req.body;

  if (ID_usuario == null || ID_articulo == null) {
      return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID de usuario y el ID del artículo.' });
  }

  try {
      const pool = await getConnection();

      // Obtener el ID_producto a partir del ID_articulo
      const resultProducto = await pool
          .request()
          .input('ID_articulo', sql.NVarChar, ID_articulo)
          .query('SELECT ID_producto FROM Productos WHERE ID_articulo = @ID_articulo');

      if (resultProducto.recordset.length === 0) {
          return res.status(404).json({ msg: 'Producto no encontrado' });
      }

      const ID_producto = resultProducto.recordset[0].ID_producto;

      // Eliminar el producto del carrito
      await pool
          .request()
          .input('ID_usuario', sql.Int, ID_usuario)
          .input('ID_producto', sql.Int, ID_producto)
          .query('DELETE FROM CarritoCompras WHERE ID_usuario = @ID_usuario AND ID_producto = @ID_producto');

      return res.status(200).json({ msg: 'Artículo eliminado del carrito exitosamente' });
  } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
      return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};


export const updateCartItemQuantitySkill = async (req, res) => {
  const { ID_usuario, ID_articulo, nuevaCantidad } = req.body;

  if (!ID_usuario || !ID_articulo || !nuevaCantidad) {
      return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID de usuario, el ID del artículo y la nueva cantidad.' });
  }

  try {
      const pool = await getConnection();

      // Obtener el producto por ID_articulo
      const resultProducto = await pool
          .request()
          .input('ID_articulo', sql.NVarChar, ID_articulo)
          .query(querysCarritoCompras.getProductByArticleId);

      if (resultProducto.recordset.length === 0) {
          return res.status(404).json({ msg: 'Producto no encontrado.' });
      }

      const producto = resultProducto.recordset[0];

      if (nuevaCantidad > producto.existencias) {
          return res.status(400).json({ msg: `No es posible agregar ${nuevaCantidad} unidades. Solo hay ${producto.existencias} unidades disponibles.` });
      }

      // Actualizar la cantidad en el carrito
      await pool
          .request()
          .input('ID_usuario', sql.Int, ID_usuario)
          .input('ID_articulo', sql.NVarChar, ID_articulo)
          .input('nuevaCantidad', sql.Int, nuevaCantidad)
          .query(querysCarritoCompras.updateCartItemQuantity);

      return res.status(200).json({ msg: 'Cantidad actualizada en el carrito exitosamente' });
  } catch (error) {
      return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
