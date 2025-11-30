const connection = require("../db/connection");

async function login(username, password) {
  const promiseConnection = connection.promise();
  const [rows] = await promiseConnection.query(
    `select username, pin
    from user u
    join password p on p.user_id = u.id
    where
    pin = '${password}'
    and username = '${username}'`
  );
  console.log(rows);
  return rows;
}

module.exports = { login };
