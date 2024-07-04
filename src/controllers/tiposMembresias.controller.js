import { getConnection, sql, querysTiposMembresillas } from "../database";

export const addNewMembershipType = async (req, res) => {
  const { nombre, costo, ID_UnicoMembresia } = req.body;
  if (nombre == null || nombre === '' || costo == null || isNaN(costo) || ID_UnicoMembresia === '' || ID_UnicoMembresia == null) {
    return res.status(400).json({ msg: 'Bad Request. Please provide a name and valid cost for the membership type' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("costo", sql.Decimal(10, 2), costo)
      .input("ID_UnicoMembresia", sql.NVarChar, ID_UnicoMembresia)
      .query(querysTiposMembresillas.addNewMembershipType);
    res.json({ nombre, costo });
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getMembershipTypeById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_tipoMembresia", req.params.id)
      .query(querysTiposMembresillas.getMembershipTypeById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getMembresiaIdUnico = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_UnicoMembresia", req.params.ID_UnicoMembresia)
      .query(querysTiposMembresillas.getMembresillaIdUnico);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const getAllMembershipTypes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(querysTiposMembresillas.getAllMembershipTypes);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const deleteMembershipTypeById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_tipoMembresia", req.params.id)
      .query(querysTiposMembresillas.deleteMembershipTypeById);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};

export const updateMembershipTypeById = async (req, res) => {
  const { nombre, costo, ID_UnicoMembresia } = req.body;
  if (nombre == null || nombre === '' || costo == null || isNaN(costo)) {
    return res.status(400).json({ msg: 'Bad Request. Please provide a name and valid cost for the membership type' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("costo", sql.Decimal(10, 2), costo)
      .input("ID_UnicoMembresia", sql.NVarChar, ID_UnicoMembresia)
      .input("ID_tipoMembresia", req.params.id)
      .query(querysTiposMembresillas.updateMembershipTypeById);
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).send(escapeHtml(error.message));
  }
};
