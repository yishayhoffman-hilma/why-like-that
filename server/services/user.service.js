const userRepo = require("../repositories/user.repositories");
async function validateLogin(username, password) {
  const test = userRepo.login(username, password).length > 0;
  console.log(test);

  return test;
}

module.exports = { validateLogin };
