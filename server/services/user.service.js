const userRepo = require("../repositories/user.repositories");

async function validateLogin(username, password) {
  const response = await userRepo.login(username, password);
  console.log(response);

  if (response.length > 0) {
    return { status: "success" };
  }
  return { status: "failed" };
}

module.exports = { validateLogin };
