const connection = require("../db/connection");

async function getAll(postId) {
  const promiseConnection = connection.promise();

  const [rows] = await promiseConnection.query(
    `SELECT * FROM comment WHERE post_id = ?`,
    [postId]
  );

  return rows;
}

async function add(user_id, post_id, content) {
  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    "INSERT INTO comment(user_id, content, post_id) VALUES (?, ?, ?)",
    [user_id, post_id, content]
  );

  return result;
}
