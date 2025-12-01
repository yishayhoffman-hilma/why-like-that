var express = require("express");
var router = express.Router();
const todoService = require("../services/todo.service");

router.get("/:username", async function (req, res) {
  const username = req.params.username;

  if (!username)
    return res.status(400).send({ message: "Username is required" });

  const response = await todoService.getTodosForUsername(username);

  if (response.status === "success") {
    return res.status(200).send(response.data);
  }
  return res.status(500).send({ message: response.message });
});

module.exports = router;
