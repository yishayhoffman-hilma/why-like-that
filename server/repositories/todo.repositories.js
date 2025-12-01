const connection = require("../db/connection");

async function getAllByUsername(username) {
  const promiseConnection = connection.promise();

  const [rows] = await promiseConnection.query(
    `SELECT t.id, t.content, t.completed
     FROM todo t
     JOIN user u ON t.user_id = u.id
     WHERE u.username = ? AND deleted = 0
     ORDER BY t.id ASC`,
    [username]
  );

  return rows;
}

async function setCompleted(todoId, isCompleted) {
  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    `UPDATE todo 
     SET completed = ?
     WHERE id = ?`,
    [isCompleted, todoId]
  );

  return result;
}

async function deleteTodo(todoId) {
  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    `UPDATE todo
    SET deleted = true
    WHERE id = ?`,
    [todoId]
  );

  return result;
}

async function addTodo(user_id, content) {
  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    "INSERT INTO todo(user_id, content) VALUES (?, ?)",
    [user_id, content]
  );

  return result;
}

module.exports = { getAllByUsername, setCompleted, deleteTodo, addTodo };
