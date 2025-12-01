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
async function getComment(commentId) {
  const promiseConnection = connection.promise();

  const [rows] = await promiseConnection.query(
    `SELECT *
     FROM comment 
    WHERE id = ?`,
    [commentId]
  );

  console.log(rows);

  return rows;
}

async function add(userId, postId, content) {
  console.log("in repo");
  console.log(`user id ${userId}`);
  console.log(`post id ${postId}`);
  console.log(`content ${content}`);

  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    `INSERT INTO comment (user_id, content, post_id)
       VALUES (?, ?, ?)`,
    [userId, content, postId]
  );

  return result;
}

async function deleteComment(commentId) {
  const promiseConnection = connection.promise();

  const [result] = await promiseConnection.query(
    `UPDATE comment
      SET deleted = true
      WHERE id = ?`,
    [commentId]
  );
  console.log("in repo");

  return result;
}

module.exports = { getAll, add, deleteComment, getComment };
