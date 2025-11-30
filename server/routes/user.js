var express = require("express");
var router = express.Router();
const userService = require("../services/user.service");
router.post("/:username", function (req, res) {
  const username = req.params.username;
  const password = req.body.password;

  if (!username && !password) {
    res.status(400).send("bad input");
  }

  if (userService.validateLogin(username, password)) {
    res.send("LOGIN SUCCSES");
  }
  res.status(404).send("user not found");
});

module.exports = router;
