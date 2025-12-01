const userRepo = require("../repositories/user.repositories");

async function login(username, password) {
  const response = await userRepo.login(username, password);
  console.log(response);

  if (response.length > 0) {
    // console.log(response);
    console.log(`response in service ${response[0].user_id}`);

    return { status: "success", user: response };
  }
  throw new Error("failed");
}

module.exports = { login };
