let userData = {
  userID: null,
  tipoMembresiaID: null,
  correo: null
};

module.exports = {
  setUserData: (id, tipoMembresiaID, correo) => {
    userData.userID = id;
    userData.tipoMembresiaID = tipoMembresiaID;
    userData.correo = correo;
    console.log("userData.userID", userData.userID)
    console.log("userData.tipoMembresiaID", userData.tipoMembresiaID)
    console.log("userData.correo", userData.correo)
  },
  getUserData: () => {
    return userData;
  }
};
