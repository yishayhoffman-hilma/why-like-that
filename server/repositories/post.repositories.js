const connection = require("../db/connection");

async function getFromUser(userId) {
  const promiseConnection = connection.promise();
  const [rows] = await promiseConnection.query(
    `select *
    from post p
    join user u on p.user_id = u.id
    where user_id = ${userId}`
  );
  console.log(rows);
  return { posts: rows, status: "success" };
}

async function create(userId, content) {
  const promiseConnection = connection.promise();
  const [rows] = await promiseConnection.query(
    `select * from user
    where id = ${userId}`
  );
  if (rows.length === 0) {
    return { status: "user does not exist" };
  }

  const [result] = await promiseConnection.query(
    `insert into post(content,user_id)
    values('${content}',${userId});
    `
  );
  if (result.affectedRows > 0) {
    return { status: "insert succsesfull" };
  }
  return { status: "insert failed" };
}

module.exports = { create, getFromUser };
