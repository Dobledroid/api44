import { getConnection, querys, querysImagenesProducto, sql } from "../database";
import { obtenerFechaHoraActual } from "../utilidades/dateUtils"
import { subirImagenesProducto } from "./cloudinary.controller";

const cloudinary = require("cloudinary").v2;

export const getProducts = async (req, res) => {
  try {
    const { categoriaId, marca, precioMin, precioMax } = req.query;
    let query = "SELECT * FROM Productos";

    const pool = await getConnection();
    const request = pool.request();

    if (categoriaId || marca || precioMin || precioMax) {
      query += " WHERE";
      let conditions = [];

      if (categoriaId) {
        console.log("dato categoria", categoriaId)
        conditions.push(` ID_categoria = ${categoriaId}`);
      }
      if (marca) {
        console.log("dato marca", marca)
        conditions.push(` ID_marca = ${marca}`);
      }
      if (precioMin) {
        console.log("dato precioMin", precioMin)
        conditions.push(` precio >= ${precioMin}`);
      }
      if (precioMax) {
        console.log("dato precioMax", precioMax)
        conditions.push(` precio <= ${precioMax}`);
      }

      query += conditions.join(" AND");
    }
    console.log("query", query)
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getListProductsWithImagen = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getListProductsWithImagen);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(escapeHtml(error.message));
  }
};
export const getListProductsWithImagenPrincipal = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getListProductsWithImagenPrincipal);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(escapeHtml(error.message));
  }
};


export const getListProductsWithImagenPrincipalAdmin = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getListProductsWithImagenPrincipalAdmin);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(escapeHtml(error.message));
  }
};


export const getAllProductsWithRelations = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProductsWithRelations);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(escapeHtml(error.message));
  }
};


// export const createNewProduct = async (req, res) => {
//   const { nombre, descripcion, precio, descuento, precioFinal, ID_categoria, ID_subcategoria, ID_marca, existencias } = req.body;

//   console.log(req.body)
//   try {

//     const pool = await getConnection();
//     const transaction = pool.transaction();
//     await transaction.begin();

//     try {
//       await transaction
//         .request()
//         .input('nombre', sql.NVarChar, nombre)
//         .input('descripcion', sql.NVarChar, descripcion)
//         .input('precio', sql.Decimal(10, 2), precio)
//         .input('descuento', sql.Decimal(10, 2), descuento)
//         .input('precioFinal', sql.Decimal(10, 2), precioFinal)
//         .input('existencias', sql.Int, existencias)
//         .input('ID_categoria', sql.Int, ID_categoria)
//         .input('ID_subcategoria', sql.Int, ID_subcategoria)
//         .input('ID_marca', sql.Int, ID_marca)
//         .query(querys.addNewProduct);

//       await transaction.commit();
//       return res.sendStatus(200);
//     } catch (error) {
//       await transaction.rollback();
//       console.log(error.message)
//       res.status(500).json({ msg: 'Error interno del servidor al agregar el producto', error: error.message });
//     }
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
//   }
// };


export const createNewProduct = async (req, res) => {
  const { nombre, descripcion, categoria, subcategoria, marca, precioBase, descuentoPorcentaje, precioFinal, cantidadExistencias } = req.body;
  const files = req.files; 
  console.log(req.body)
  console.log("files", files)
  try {
    const pool = await getConnection();
    const transaction = pool.transaction();
    await transaction.begin();

    try {
      const fechaInicio = await obtenerFechaHoraActual();
      const imageUrls = await subirImagenesProducto(files, fechaInicio);
      console.log('URLs de las imágenes subidas:', imageUrls);

      const result = await transaction
        .request()
        .input('nombre', sql.NVarChar, nombre)
        .input('descripcion', sql.NVarChar, descripcion)
        .input('precioBase', sql.Decimal(10, 2), precioBase)
        .input('descuentoPorcentaje', sql.Decimal(10, 2), descuentoPorcentaje)
        .input('precioFinal', sql.Decimal(10, 2), precioFinal)
        .input('cantidadExistencias', sql.Int, cantidadExistencias)
        .input('ID_categoria', sql.Int, categoria)
        .input('ID_subcategoria', sql.Int, subcategoria)
        .input('ID_marca', sql.Int, marca)
        .query(querys.addNewProduct);

      const productId = result.recordset[0].ID_producto; // Suponiendo que la consulta devuelve el ID del producto
      console.log("productId", productId)
      for (const url of imageUrls) {
        await transaction
          .request()
          .input('ID_producto', sql.Int, productId)
          .input('imagenUrl', sql.VarChar, url)
          .query(querysImagenesProducto.addNewImagen);
      }

      await transaction.commit();
      return res.sendStatus(200);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ msg: 'Error interno del servidor al agregar el producto', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
};




export const getProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdProducto", req.params.id)
      .query(querys.getProductById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getProductByIdWithImagens = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_producto", req.params.id)
      .query(querys.getProductByIdWithImagens);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(escapeHtml(error.message));
  }
};


export const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdProducto", req.params.id)
      .query(querys.deleteProduct);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getTotalProducts = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalProducts);

    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateProductById = async (req, res) => {
  const { nombre, descripcion, precio, descuento, precioFinal, existencias, ID_categoria, ID_subcategoria, ID_marca } = req.body;
  console.log("actualizar.body", req.body)

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input('nombre', sql.NVarChar, nombre)
      .input('descripcion', sql.NVarChar, descripcion)
      .input('precio', sql.Decimal(10, 2), precio)
      .input('descuento', sql.Decimal(10, 2), descuento)
      .input('precioFinal', sql.Int, precioFinal)
      .input('existencias', sql.Int, existencias)
      .input('ID_categoria', sql.Int, ID_categoria)
      .input('ID_subcategoria', sql.Int, ID_subcategoria)
      .input('ID_marca', sql.Int, ID_marca)
      .input('IdProducto', sql.Int, req.params.id)
      .query(querys.updateProductById);
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};


export const updateItemQuantityByID_Orden = async (req, res) => {
  const { ID_producto, cantidad } = req.body;

  if (ID_producto == null || cantidad == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID del artículo del carrito y la cantidad' });
  }

  try {

    const pool = await getConnection();

    const productResult = await pool
      .request()
      .input("IdProducto", sql.Int, ID_producto)
      .query(querys.getProductById);

    if (!productResult.recordset.length) {
      return res.status(404).json({ msg: 'El producto no fue encontrado' });
    }

    const existenciaActual = productResult.recordset[0].existencias;
    const nuevaExistencia = existenciaActual - cantidad;
    if (nuevaExistencia < 0) {
      return res.status(400).json({ msg: 'La cantidad especificada es mayor que la existencia actual del producto' });
    }

    await pool
      .request()
      .input("cantidad", sql.Int, nuevaExistencia)
      .input("ID_producto", sql.Int, ID_producto)
      .query(querys.updateItemQuantityByID_Orden);

    console.log("Existencia actualizada OK 200")
    // res.json({ msg: 'Cantidad de artículo actualizada correctamente' });11
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};
