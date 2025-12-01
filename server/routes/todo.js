var express = require("express");
var router = express.Router();
const todoService = require("../services/todo.service");

//change completed
router.patch("/completed/:todoId", async function (req, res) {
  const todoId = req.params.todoId;
  const isCompleted = req.body.completed;

  if (!todoId) {
    return res.status(400).send({ message: "todoId is required" });
  }

  if (isCompleted === undefined || isCompleted === null) {
    return res.status(400).send({ message: "isCompleted is required" });
  }

  const response = await todoService.changeCompletedField(todoId, isCompleted);

  if (response.status !== "success") {
    return res.status(400).send({ message: response.message });
  }

  return res.status(200).send(response);
});

//get todos
router.get("/user/:username", async function (req, res) {
  const username = req.params.username;

  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }

  const response = await todoService.getTodosForUsername(username);

  if (response.status === "success") {
    return res.status(200).send(response.data);
  }

  return res.status(500).send({ message: response.message });
});

//delete todo
router.delete("/delete/:todoId", async function (req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).send({ message: "todoId is required" });
  }

  const response = await todoService.deleteTodoForUser(todoId);

  if (response.status !== "success") {
    return res.status(400).send({ message: response.message });
  }

  return res.status(200).send(response);
});

// Add new todo
router.post("/addTodo", async function (req, res) {
  const user_id = req.body.user_id;
  const content = req.body.content;

  if (!user_id) {
    return res.status(400).send({ message: "user_id is required" });
  }

  if (!content) {
    return res.status(400).send({ message: "content is required" });
  }

  const response = await todoService.addTodoForUser(user_id, content);

  if (response.status !== "success") {
    return res.status(400).send({ message: response.message });
  }

  return res.status(200).send(response);
});

module.exports = router;
