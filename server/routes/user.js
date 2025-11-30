var express = require("express");
var router = express.Router();

router.post("/:username", function (req, res) {
  const username = req.params.username;
  const password = req.body.password;
  if (username && password) {
    res.status(400).send("bad input");
  }

  res.send("respond with a resource");
});

module.exports = router;
