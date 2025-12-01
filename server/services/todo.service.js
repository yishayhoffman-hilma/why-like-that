const todoRepo = require("../repositories/todo.repositories");

async function getTodosForUsername(username) {
  try {
    const todos = await todoRepo.getAllByUsername(username);
    return { status: "success", data: todos };
  } catch (err) {
    return { status: "error", message: "Database error" };
  }
}

module.exports = { getTodosForUsername };
