const todoRepo = require("../repositories/todo.repositories");

async function getUserTodo(userId) {
  const todos = await todoRepo.getAllTodo(userId);
  return todos;
}

module.exports = { getUserTodo };
