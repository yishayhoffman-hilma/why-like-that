const connection = require("../db/connection");

async function getFromUser(userId) {
  const promiseConnection = connection.promise();
  const [rows] = await promiseConnection.query(
    `SELECT 
    p.id AS postId,        
    p.user_id,
    p.content,
    u.id AS user_details_id,  
    u.username
    FROM post p
    JOIN user u ON p.user_id = u.id
    WHERE p.user_id = ${userId}`
  );
  console.log(rows);
  return { posts: rows, status: "success" };
}
async function getAll() {
  const promiseConnection = connection.promise();
  const [rows] = await promiseConnection.query(
    `SELECT username,p.id,content,user_id
    from post p 
    join user u on p.user_id = u.id
    order by p.id asc
    `
  );
  console.log(rows);
  return { posts: rows, status: "success" };
}

async function get(postId) {
  const promiseConnection = connection.promise();
  const [rows] = await promiseConnection.query(
    `select *
    from post
    where id = ${postId}`
  );
  console.log(`in post repo : ${rows[0]}`);
  if (rows.length > 0) {
    return { data: rows[0], status: "success", content: rows[0].content };
  }
  return { status: "post does not exist" };
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
    return { status: "insert successfull" };
  }
  return { status: "insert failed" };
}

module.exports = { create, getFromUser, get, getAll };
