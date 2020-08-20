const fs = require("fs");
const path = require("path");
const model = require("./model");
const template = require("./template");
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");

// -------Home Handler------------------
function home(request, response) {
  model.getPosts().then(posts => {
    const html = template.compileHome(posts);
    response.writeHead(200, { "content-type": "text/html" });
    response.end(html);
  });
}

// --------Missing handler---------------
function missing(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(`<h1>Oops, nothing for you over here</h1>`);
}
// --------Create Post Handler---------------

function createPost(request, response) {


  let body = "";
  request.on("data", chunk => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const data = Object.fromEntries(searchParams);

    if (!request.headers.cookie) return sendRedirect();
    const { jwt } = parse(request.headers.cookie);
    if (!jwt) return sendRedirect();

    return verify(jwt, SECRET, (err, jwt) => {
      if (err) { return sendRedirect(); }
      else {
        let values = [jwt.userID, data.post];
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
    // console.log(searchParams);
    const data = Object.fromEntries(searchParams);
    //console.log("data = ", data);
    model
      .createUser(data)
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
module.exports = { home, missing, createUser, public, createPost };
