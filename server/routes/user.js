var express = require("express");
var router = express.Router();
const userService = require("../services/user.service");
router.post("/:username", async function (req, res) {
  const username = req.params.username;
  const password = req.body.password;

  if (!username && !password) {
    res.status(400).send({ status: "bad input" });
    return;
  }

  const flag = await userService.validateLogin(username, password);
  console.log(flag);

  if (flag) {
    res.send({ username: username, status: "login successfull" });
    return;
  }

  res.status(404);
  res.send("user not found");
  return;
});

module.exports = router;
