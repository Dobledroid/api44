let userData = {
    userID: null,
    total: null,
    currentURL: null,
    ID_direccion: null
  };
  
  module.exports = {
    setUserData: (id, total, currentURL, ID_direccion) => {
      userData.userID = id;
      userData.total = total;
      userData.currentURL = currentURL;
      userData.ID_direccion = ID_direccion;
      console.log("userData.userID", userData.userID)
      console.log("userData.total", userData.total)
      console.log("userData.currentURL", userData.currentURL)
      console.log("userData.ID_direccion", userData.ID_direccion)
    },
    getUserData: () => {
      return userData;
    }
  };