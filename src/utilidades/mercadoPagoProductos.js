let userData = {
  userID: null,
  total: null
};

module.exports = {
  setUserData: (id, total) => {
    userData.userID = id;
    userData.total = total;
    console.log("userData.userID", userData.userID)
    console.log("userData.total", userData.total)
  },
  getUserData: () => {
    return userData;
  }
};
