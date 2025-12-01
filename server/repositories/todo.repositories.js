const connection = require("../db/connection");

async function getAllByUsername(username) {
  const promiseConnection = connection.promise();

  const [rows] = await promiseConnection.query(
    `SELECT t.id, t.content, t.completed
     FROM todo t
     JOIN user u ON t.user_id = u.id
     WHERE u.username = ?
     ORDER BY t.id ASC`,
    [username]
  );

  return rows;
}

module.exports = { getAllByUsername };
