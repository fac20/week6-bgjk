const fs = require("fs");
const path = require("path");
const model = require("./model");
const template = require("./template");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");

dotenv.config();

// -------Home Handler------------------
function home(request, response) {
  // check request header for cookies
  // assign boolean value to loggedIn depending on cookie
  // needs to be updated to check for althenticated cookie
  let loggedIn;
  if (request.headers.cookie) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }
  // check userId if logged in
  model.getPosts().then(posts => {
    const html = template.compileHome(posts, loggedIn);
    response.writeHead(200, { "content-type": "text/html" });
    response.end(html);
  });
}

//---------Display Sign Up Page----------
function displaySignup(request, response) {
  const filePath = path.join(__dirname, "..", "public", "signup.html");

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      missing();
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
  // response.writeHead(200, { "content-type": "text/html" });
  //     response.end("../public/signup.html");
}
// --------Missing handler---------------
function missing(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(`<h1>Oops, nothing for you over here</h1>`);
}

// --------Login handler----------------
function login(request, response) {
  let token;
  let body = "";
  request.on("data", chunk => (body += chunk));
  request.on("end", () => {
    // take the users inputs and place them into a new object called data
    const searchParams = new URLSearchParams(body);
    const data = Object.fromEntries(searchParams);
    // get user's hashed password and salt form password column of database
    model
      .getUser(data.username) //get user info from database
      .then(user => {
        // create json web token (jwt) from user data and secret key
        const userDetails = { userId: user[0].id };
        console.log(userDetails);
        token = sign(userDetails, process.env.SECRET);
        // compare new password with old via bcrypt.compare
        return bcrypt.compare(data.password, user[0].password);
      })
      // return the writeHead with a cookie attached to show they're logged in.
      .then(result => {
        if (!result) throw new Error("password mismatch!");

        response.writeHead(302, {
          location: "/",
          "set-cookie": `jwt=${token}`,
        });
        response.end();
      })

      .catch(error => {
        response.writeHead(401, {
          "content-type": "text/html",
        });
        response.end(`<h1>Incorrect password or username</h1>`);
      });
  });
}

// --------Create Post Handler---------------

function createPost(request, response) {
  let body = "";
  request.on("data", chunk => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const data = Object.fromEntries(searchParams);

    // check if the user has any existing cookies
    if (!request.headers.cookie) return sendRedirect();
    // create an object with a 'jwt' property  and parse the users cookies into it
    // parse into it the cookies and assign the cookie with the name jwt to the property 'jwt' in the newobject
    // if the jwt cookie name doesnt exist then object would look like this :
    // {jwt: undefined}
    const { jwt } = parse(request.headers.cookie);
    // if jwt is a falsy then redirect
    if (!jwt) return sendRedirect();

    return verify(jwt, process.env.SECRET, (err, jwt) => {
      if (err) {
        return sendRedirect();
      } else {
        let values = [jwt.userId, data.post];
        model
          .createPost(values) //save post info to posts table in database
          .then(() => {
            response.writeHead(302, { location: "/" });
            response.end();
          })
          .catch(error => {
            console.error(error);
            response.writeHead(500, { "content-type": "text/html" });
            response.end("<h1>No connection no beans</h1>");
          });
      }
      //console.log("data = ", data);
    });

    // response.writeHead(404, { "content-type": "text/html" });
    // response.end("<h1>Oops, nothing for you over here</h1>");
  });
}

// --------Create User Handler---------------
function createUser(request, response) {
  let body = "";
  request.on("data", chunk => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const user = Object.fromEntries(searchParams);
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => {
        user.password = hash;
        model.createUser(user);
      })
      .then(() => {
        response.writeHead(302, { location: "/" });
        response.end();
      })
      .catch(error => {
        console.error(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`<h1>No connection no beans</h1>`);
      });
  });

  // response.writeHead(404, { "content-type": "text/html" });
  // response.end("<h1>Oops, nothing for you over here</h1>");
}

// --------Public handler----------------
const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  png: "image/png",
  svg: "image/svg+xml",
  ico: "image/x-icon",
};

function public(request, response) {
  const url = request.url;
  const urlArray = url.split(".");
  const extension = urlArray[urlArray.length - 1];
  const type = types[extension];

  const filePath = path.join(__dirname, "..", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1>Not found</h1>");
    } else {
      response.writeHead(200, { "content-type": type });
      response.end(file);
    }
  });
}

module.exports = {
  home,
  missing,
  createUser,
  public,
  createPost,
  displaySignup,
  login,
};
