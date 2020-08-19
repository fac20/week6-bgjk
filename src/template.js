const model = require("./model");
const handlers = require("./handlers");
// function createArticle(something) {
//     return `template ${something } literal`
// }

function compileSkeleton(content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Spill.....</title>
        <link href="https://fonts.googleapis.com/css?family=Lato|Open+Sans&display=swap" rel="stylesheet">
        <link href="/public/style.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;800&display=swap" rel="stylesheet">
        <link rel="icon" type="image/svg-xml" href="/public/favicon.svg">
    </head>
    <body>
        <h1 class="heading-logo">Spill Your Beans</h1>
        <main>
            <form 
            method ='POST' action ='/submit'>
                <label for="username">Name :</label>
                <input type="text" id="username" name="username" required>
                <label for="location">Location :</label>
                <input type="text" id="location" name="location" required>
                <label for="post">Post :</label>
                <input type="text" id="post" name="post" required>
                <button type='submit'>SUBMIT</button>
            </form> 
          ${content}

        </main>
        <script src="public/main.js"></script>
        <script src="https://kit.fontawesome.com/8edb3d78c9.js" crossorigin="anonymous"></script>
    </body>
    </html>
    `;
}

function compileUsers(usersArray) {
  return usersArray
    .map(user => {
      return `
          <article class="post">
              <p>Written by: ${user.id}</p>
              <p>Inhabitant of: ${user.location}</p>
          </article>
  `;
    })
    .join("");
}

function compileHome(something) {
  return compileSkeleton(compileUsers(something));
}

module.exports = { compileHome };
