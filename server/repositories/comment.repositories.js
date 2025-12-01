const connection = require("../db/connection");

async function getAll(postId) {
  const promiseConnection = connection.promise();

  const [rows] = await promiseConnection.query(
    `SELECT u.username, c.id, c.user_id, c.post_id, content, deleted
     FROM comment c
        JOIN user u ON c.user_id = u.id
    WHERE
        post_id = ?
        AND deleted = false`,
    [postId]
  );

  return rows;
}

async function add(userId, postId, content) {
  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    `INSERT INTO comment(user_id, content, post_id)
     VALUES (?, ?, ?)`[(user_id, post_id, content)]
  );

  return result;
}

async function deleteComment(commentId) {
  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    `UPDATE comment
    SET deleted = true
    WHERE id = commentId`,
    [commentId]
  );

  return result;
}

module.exports = { getAll, add, deleteComment };
