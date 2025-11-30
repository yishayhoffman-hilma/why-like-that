var express = require("express");
var router = express.Router();
const userService = require("../services/user.service");
router.post("/:username", async function (req, res) {
  const username = req.params.username;
  const password = req.body.password;

  if (!username && !password) {
    res.status(400).send("bad input");
    return;
  }
  const response = await userService.validateLogin(username, password);
  console.log(flag);

  if (response.status === "failed") {
    res.status(404);
    res.send({ status: "user not found" });
    return;
  }
  res.send(`${{ username: username, status: "login successfull" }}`);
});

module.exports = router;
