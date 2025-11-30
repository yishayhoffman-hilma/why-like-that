const userRepo = require("../repositories/user.repositories");
async function validateLogin(username, password) {
  const test = await userRepo.login(username, password);
  console.log(test);

  return test.length > 0;
}

module.exports = { validateLogin };
