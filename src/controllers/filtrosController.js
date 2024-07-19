import { getConnection, sql, querysFiltros } from "../database";

export const filtrarFiltros = async (req, res) => {
  const { ID_categoria, ID_marca, ID_subcategoria, minPrecio, maxPrecio } = req.query;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_categoria", sql.Int, ID_categoria || null)
      .input("ID_marca", sql.Int, ID_marca || null)
      .input("ID_subcategoria", sql.Int, ID_subcategoria || null)
      .input("minPrecio", sql.Decimal(18, 2), minPrecio || null)
      .input("maxPrecio", sql.Decimal(18, 2), maxPrecio || null)
      .query(querysFiltros.filtrarFiltros);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const getListProductsWithImagenPrincipal = async (req, res) => {
  console.log("getListProductsWithImagenPrincipal", req.query);
  const { ID_categoria, ID_subcategoria, ID_marca } = req.query;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_categoria", sql.Int, ID_categoria || null)
      .input("ID_subcategoria", sql.Int, ID_subcategoria || null)
      .input("ID_marca", sql.Int, ID_marca || null)
      .query(querysFiltros.getListProductsWithImagenPrincipal);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
