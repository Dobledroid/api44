let userData = {
  userID: null,
  total: null,
  currentURL: null,
  tipoMembresiaID: null,
  correo: null,
  ID_UnicoMembresia: null,
  fechaVencimiento: null,
  ID_membresiaUsuario: null
};

module.exports = {
  setUserData: (id, total, currentURL, tipoMembresiaID, correo, ID_UnicoMembresia, fechaVencimiento, ID_membresiaUsuario) => {
    userData.userID = id;
    userData.total = total;
    userData.currentURL = currentURL;
    userData.tipoMembresiaID = tipoMembresiaID;
    userData.correo = correo;
    userData.ID_UnicoMembresia = ID_UnicoMembresia;
    userData.fechaVencimiento = fechaVencimiento;
    userData.ID_membresiaUsuario = ID_membresiaUsuario;
    console.log("userData.userID", userData.userID)
    console.log("userData.total", userData.total)
    console.log("userData.currentURL", userData.currentURL)
    console.log("userData.tipoMembresiaID", userData.tipoMembresiaID)
    console.log("userData.correo", userData.correo)
    console.log("ID_UnicoMembresia", userData.ID_UnicoMembresia)
    console.log("fechaVencimiento", userData.fechaVencimiento)
    console.log("ID_membresiaUsuario", userData.ID_membresiaUsuario)
  },
  getUserData: () => {
    return userData;
  }
};