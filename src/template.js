function compileSkeleton(form, posts) {
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
          ${form}
          ${posts}

        </main>
        <script src="public/main.js"></script>
        <script src="https://kit.fontawesome.com/8edb3d78c9.js" crossorigin="anonymous"></script>
    </body>
    </html>
    `;
}

function compilePosts(postsArray) {
  return postsArray
    .map(post => {
      //Needs to be updated with new post content when db.connections found in model.js is finished
      return `
          <article class="post">
          <section class="textsect">
              <p class="hidden" class="id">Post ID: ${post.id}</p>
              <p class="written">Written by: ${post.username}</p>
              <p class="posttext">${post.text_content}</p>
              </section>
              <form action='/delete' method='DELETE' >
                <button type='submit' id="deleteButton" >DELETE POST</button>
              </form>
          </article>
  `;
    })
    .join("");
}

loginForm = `
<form 
class="form"
method ='POST' action='/login'>
    <label for="username">Username :</label>
    <input type="text" id="username" name="username" required>
    <label for="password">Password :</label>
    <input type="password" id="password" name="password" required>
    <button type='submit' class="formButton">Login</button>
</form>
`;
postForm = `
<form 
class="form"
method ='POST' action ='/submit'>
    <label for="post">Post :</label>
    <input type="text" id="post" name="post" required>
    <button type='submit' class="formButton">SUBMIT</button>
</form>
`;

function compileHome(content, loggedIn) {
  // select the login form if user is not logged in or the form to post content if they're not
  let form = loggedIn ? postForm : loginForm;
  return compileSkeleton(form, compilePosts(content));
}

module.exports = { compileHome };
