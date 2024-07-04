
import { crearQRMembresia } from "./QR.controller"

export const prueba = async (req, res) => {
  const responseHistorialMembresia = await crearQRMembresia({
    body: {
      ID_usuario: 1,
      fechaInicio: "membresiaData.fechaInicio",
      fechaVencimiento: "membresiaData.fechaVencimiento",
      ID_tipoMembresia: "tipoMembresiaData.ID_tipoMembresia"
    }
  });
};