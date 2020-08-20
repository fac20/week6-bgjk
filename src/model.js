const db = require("./database/connection");

// query to obtain a single user who's username and hashed password matches that from the form input.

function getUser(input) {
  return db
    .query(
      `SELECT * FROM users 
    WHERE username = '${input}'`
    )
    .then(result => result.rows);
}
// A query to select all users from the users column
function getUsers() {
  return db.query("SELECT * FROM users").then(result => result.rows);
}

function getPosts() {
  return db
    .query(
      `
    SELECT users.username, users.location, posts.text_content 
    FROM users INNER JOIN posts
    ON users.id = posts.user_id`
    )
    .then(result => result.rows);
}

// Insert new user into user array
function createUser(data) {
  // User information taken from form placed in variable
  const userValues = [data.username, data.location, data.password];
  //  Place the new user data into the table with a db.query
  return db
    .query(
      "INSERT INTO users(username, location, password) VALUES($1, $2, $3) RETURNING id",
      userValues
    )
    .then(result => result.rows);
}

// Insert new post into posts table
function createPost(values) {
  return db.query(
    "INSERT INTO posts(user_id, text_content) VALUES($1, $2)",
    values
  );
}

//   const postValues = [
//     //db.query(`SELECT id FROM users WHERE username = ${data.username}`),
//     createUser(data),
//     data.content,
//   ];
//   // Place the post text into the posts table along side the user_id foreign key
//   return db.query(
//     "INSERT INTO posts(user_id, text_content) VALUES($1, $2)",
//     postValues
//   );
// }
module.exports = { getUsers, createUser, createPost, getPosts, getUser };
