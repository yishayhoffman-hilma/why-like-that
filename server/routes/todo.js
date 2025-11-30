var express = require("express");
var router = express.Router();
const todoService = require("../services/todo.service");

router.get("/:userId", async function (req, res) {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).send({ status: "bad input" });
    return;
  }
  const response = await todoService.getUserTodo(userId);
  res.json({ todos: response, status: "success" });
});

router.post("/:userId", async function (req, res) {
  const content = req.body.content;
  if (!content) {
    res.status(400).send({ status: "bad input" });
    return;
  }
  const flag = await todoService.insert(username, password);
});

module.exports = router;
