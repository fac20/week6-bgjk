const handlers = require("./handlers");

function router(request, response) {
  const { url, method } = request;
  if (url === "/" && method === "GET") {
    handlers.home(request, response);
  } else if (url === "/signup" && method === "POST") {
    handlers.createUser(request, response);
  } else if (url === "/signup" && method === "GET") {
    handlers.displaySignup(request, response);
  } else if (url === "/login" && method === "POST") {
    handlers.login(request, response);
  } else if (url === "/submit" && method === "POST") {
    handlers.createPost(request, response);
  } else if (url.includes("/public")) {
    handlers.public(request, response);
  } else {
    handlers.missing(request, response);
  }
}

module.exports = router;
