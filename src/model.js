const db = require("./database/connection");

/*------- Get Single User Detales -------*/
function getUser(input) {
  return db
    .query(
      `SELECT * FROM users 
    WHERE username = '${input}'`
    )
    .then(result => result.rows);
}

/*------- Get All Users Detales -------*/
function getUsers() {
  return db.query("SELECT * FROM users").then(result => result.rows);
}

/*------- Get Posts -------*/
function getPosts() {
  return db
    .query(
      `
    SELECT users.username, users.location, posts.id, posts.text_content 
    FROM users INNER JOIN posts
    ON users.id = posts.user_id`
    )
    .then(result => result.rows);
}

/*------- Delete Posts -------*/
function deletePost(postId, userId) {
  return db.query(`
  DELETE FROM posts 
  WHERE id = '${postId}'
  AND user_id = '${userId}'
  `);
}

/*------- Insert new user into user table -------*/
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

/*------- Insert new post into posts table -------*/
function createPost(values) {
  return db.query(
    "INSERT INTO posts(user_id, text_content) VALUES($1, $2)",
    values
  );
}

module.exports = { getUsers, createUser, createPost, getPosts, getUser };
