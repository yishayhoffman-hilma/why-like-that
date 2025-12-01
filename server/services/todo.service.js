const todoRepo = require("../repositories/todo.repositories");

async function getTodosForUsername(username) {
  try {
    const todos = await todoRepo.getAllByUsername(username);
    return { status: "success", data: todos };
  } catch (err) {
    return { status: "error", message: "database error" };
  }
}

async function changeCompletedField(todoId, isCompleted) {
  try {
    const result = await todoRepo.setCompleted(todoId, isCompleted);

    if (result.affectedRows === 0) {
      return {
        status: "error",
        message: "Todo not found or already set to the value",
      };
    }

    return {
      status: "success",
      message: "Todo updated",
    };
  } catch (err) {
    return { status: "error", message: "database error" };
  }
}

async function deleteTodoForUser(todoId) {
  try {
    const result = await todoRepo.deleteTodo(todoId);

    if (result.affectedRows === 0) {
      return {
        status: "error",
        message: "Todo not found",
      };
    }

    return {
      status: "success",
      message: "Todo deleted",
    };
  } catch (err) {
    return { status: "error", message: "database error" };
  }
}

async function addTodoForUser(user_id, content) {
  try {
    const result = await todoRepo.addTodo(user_id, content);
    if (result.affectedRows === 0) {
      return {
        status: "error",
        message: "cant add todo",
      };
    }

    return {
      status: "success",
      message: "Todo added",
    };
  } catch (err) {
    return { status: "error", message: "database error" };
  }
}

module.exports = {
  getTodosForUsername,
  changeCompletedField,
  deleteTodoForUser,
  addTodoForUser,
};
