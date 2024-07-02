
// Función para generar un código aleatorio de 6 dígitos
export const generateRandomCode=()=> {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  