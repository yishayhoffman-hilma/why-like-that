const connection = require("../db/connection");

async function getAll(userId) {
  const promiseConnection = connection.promise();
  const [rows] = await promiseConnection.query(
    `select content
    from todo t
    where t.user_id = ${userId}`
  );
  console.log("rows", rows);
  return rows;
}

module.exports = { getAllTodo };
