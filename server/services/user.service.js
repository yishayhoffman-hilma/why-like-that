const userRepo = require("../repositories/user.repositories");

async function validateLogin(username, password) {
  console.log("password: ", password);
  console.log("username: ", username);
  const test = await userRepo.login(username, password);
  console.log("test", test);

  return test.length > 0;
}

module.exports = { validateLogin };
