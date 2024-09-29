import { getConnection, querys, querysImagenesProducto, sql } from "../database";
import { obtenerFechaHoraActual } from "../utilidades/dateUtils"
import { subirImagenesProducto } from "./cloudinary.controller";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});


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
    res.status(500).send(error.message);
  }
};

export const getListProductsWithImagen = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getListProductsWithImagen);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(error.message);
  }
};
export const getListProductsWithImagenPrincipal = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getListProductsWithImagenPrincipal);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(error.message);
  }
};

export const getListProductsWithImagenPrincipalAdmin = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getListProductsWithImagenPrincipalAdmin);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(error.message);
  }
};

export const getAllProductsWithRelations = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProductsWithRelations);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(error.message);
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
  // console.log(req.body)
  // console.log("files", files)
  try {
    const pool = await getConnection();
    const transaction = pool.transaction();
    await transaction.begin();

    try {
      const fechaInicio = await obtenerFechaHoraActual();
      const imageUrls = await subirImagenesProducto(files, fechaInicio);
      // console.log('URLs de las imágenes subidas:', imageUrls);

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
      // console.log("productId", productId)
      for (const url of imageUrls) {
        await transaction
          .request()
          .input('ID_producto', sql.Int, productId)
          .input('imagenUrl', sql.VarChar, url)
          .query(querysImagenesProducto.addNewImagen);
      }

      await transaction.commit();
      return res.status(200).json({ success: true });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ msg: 'Error interno del servidor al agregar el producto', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
};


export const getProductById = async (req, res) => {
  console.log("getProductById - req.params", req.params)
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdProducto", req.params.id)
      .query(querys.getProductById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProductByIdEditar = async (req, res) => {
  console.log("getProductByIdEditar - req.params", req.params)
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_producto", req.params.id)
      .query(querys.getEditarProductById);

      if (result.recordset.length === 0) {
        return res.status(404).send("Producto no encontrado");
      }

      const product = result.recordset[0];
      product.imagenes = result.recordset.map(record => record.imagenUrl);
  
      return res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
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
    res.status(500).send(error.message);
  }
};

export const getProductByIdWithImagensIonic = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_producto", req.params.id)
      .query(querys.getProductByIdWithImagens);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Suponiendo que todas las filas se refieren al mismo producto
    const product = {
      ID_producto: result.recordset[0].ID_producto,
      nombre: result.recordset[0].nombre,
      descripcion: result.recordset[0].descripcion,
      precio: result.recordset[0].precio,
      descuento: result.recordset[0].descuento,
      precioFinal: result.recordset[0].precioFinal,
      existencias: result.recordset[0].existencias,
      ID_categoria: result.recordset[0].ID_categoria,
      ID_subcategoria: result.recordset[0].ID_subcategoria,
      ID_marca: result.recordset[0].ID_marca,
      ID_articulo: result.recordset[0].ID_articulo,
      imagenes: result.recordset.map((row) => row.imagenUrl), // Agrupar las imágenes en un arreglo
    };

    res.json(product);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};


export const deleteProductById = async (req, res) => {
  console.log("deleteProductById", req.params);
  try {
    const pool = await getConnection();

    // Obtener todas las imágenes del producto
    const imagenesResult = await pool
      .request()
      .input("ID_producto", sql.Int, req.params.id)
      .query(querysImagenesProducto.getImagenesByProductoId);

    const imagenes = imagenesResult.recordset;
    // console.log("Imágenes del producto a eliminar:", imagenes);

    if (imagenes.length > 0) {
      // Eliminar las imágenes de Cloudinary y de la base de datos
      for (const imagen of imagenes) {
        const publicId = imagen.imagenUrl.split('/').pop().split('.')[0];
        const extension = imagen.imagenUrl.split('.').pop();
        await cloudinary.uploader.destroy(`Productos/${publicId}.${extension}`);

        await pool
          .request()
          .input("ID_imagen", sql.Int, imagen.ID_imagen)
          .query(querysImagenesProducto.deleteImagenById);
      }
    }

    // Eliminar el producto
    const result = await pool
      .request()
      .input("IdProducto", sql.Int, req.params.id)
      .query(querys.deleteProduct);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    // console.log("deleteProductById, error", error);
    res.status(500).send(error.message);
  }
};

export const getTotalProducts = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalProducts);

    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// export const updateProductById = async (req, res) => {
//   const { nombre, descripcion, precio, descuento, precioFinal, existencias, ID_categoria, ID_subcategoria, ID_marca } = req.body;
//   console.log("updateProductById - req.body", req.body)

//   try {
//     const pool = await getConnection();

//     await pool
//       .request()
//       .input('nombre', sql.NVarChar, nombre)
//       .input('descripcion', sql.NVarChar, descripcion)
//       .input('precio', sql.Decimal(10, 2), precio)
//       .input('descuento', sql.Decimal(10, 2), descuento)
//       .input('precioFinal', sql.Int, precioFinal)
//       .input('existencias', sql.Int, existencias)
//       .input('ID_categoria', sql.Int, ID_categoria)
//       .input('ID_subcategoria', sql.Int, ID_subcategoria)
//       .input('ID_marca', sql.Int, ID_marca)
//       .input('IdProducto', sql.Int, req.params.id)
//       .query(querys.updateProductById);
//     return res.sendStatus(200);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

export const updateProductById = async (req, res) => {
  const { nombre, descripcion, precioBase, descuentoPorcentaje, precioFinal, cantidadExistencias, categoria, subcategoria, marca, existingImages } = req.body;
  const files = req.files;
  console.log("updateProductById - req.body", req.body);
  console.log("updateProductById - files", files);

  let existingImageUrls = [];
  if (existingImages) {
    existingImageUrls = JSON.parse(existingImages);
    console.log("Extracted existing image URLs:", existingImageUrls);
  }

  try {
    const pool = await getConnection();
    const transaction = pool.transaction();
    await transaction.begin();

    try {
      const fechaInicio = await obtenerFechaHoraActual();
      const imageUrls = await subirImagenesProducto(files, fechaInicio);
      console.log('URLs de las imágenes subidas:', imageUrls);

      await transaction
        .request()
        .input('nombre', sql.NVarChar, nombre)
        .input('descripcion', sql.NVarChar, descripcion)
        .input('precio', sql.Decimal(10, 2), precioBase)
        .input('descuento', sql.Decimal(10, 2), descuentoPorcentaje)
        .input('precioFinal', sql.Decimal(10, 2), precioFinal)
        .input('existencias', sql.Int, cantidadExistencias)
        .input('ID_categoria', sql.Int, categoria)
        .input('ID_subcategoria', sql.Int, subcategoria)
        .input('ID_marca', sql.Int, marca)
        .input('IdProducto', sql.Int, req.params.id)
        .query(querys.updateProductById);

      // Eliminar imágenes antiguas del producto en la base de datos
      await transaction
        .request()
        .input('ID_producto', sql.Int, req.params.id)
        .query(querysImagenesProducto.deleteImagenesByProductoId);

      // Añadir imágenes existentes y nuevas a la base de datos
      const allImageUrls = [...existingImageUrls, ...imageUrls];
      for (const url of allImageUrls) {
        console.log("#url", url)
        await transaction
          .request()
          .input('ID_producto', sql.Int, req.params.id)
          .input('imagenUrl', sql.VarChar, url)
          .query(querysImagenesProducto.addNewImagen);
      }

      await transaction.commit();
      return res.status(200).json({ success: true });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ msg: 'Error interno del servidor al actualizar el producto', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
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
    res.status(500).send(error.message);
  }
};
