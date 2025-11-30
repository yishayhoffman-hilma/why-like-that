var express = require("express");
var router = express.Router();

router.get("/:username", function (req, res) {
  res.send("respond with a resource");
});

module.exports = router;
