const userRep = require("../repositories/user.repositories");
async function validateLogin(username, password) {
  return userRep.login(username, password).length > 0;
}

module.exports = { validateLogin };
