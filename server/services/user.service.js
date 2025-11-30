const userRep = require("../repositories/user.repositories");
async function validateLogin(username, password) {
  console.log("in service");

  return userRep.login(username, password).length > 0;
}

module.exports = { validateLogin };
