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
              <p class="hidden">Post ID: ${post.id}</p>
              <p>Written by: ${post.username}</p>
              <p>${post.text_content}</p>
              <form action='/delete' method='DELETE'>
                <button type='submit' id="delete-button class="post__button--delete">DELETE POST</button>
              </form>
          </article>
  `;
    })
    .join("");
}

loginForm = `
<form 
method ='POST' action='/login'>
    <label for="username">Username :</label>
    <input type="text" id="username" name="username" required>
    <label for="password">Password :</label>
    <input type="password" id="password" name="password" required>
    <button type='submit'>Login</button>
</form>
`;
postForm = `
<form 
method ='POST' action ='/submit'>
    <label for="post">Post :</label>
    <input type="text" id="post" name="post" required>
    <button type='submit'>SUBMIT</button>
</form>
`;

function compileHome(content) {
  // default value to be changed later must check cookie.
  let loggedIn = false;
  // select the login form if user is not logged in or the form to post content if they're not
  let form = loggedIn ? postForm : loginForm;
  return compileSkeleton(form, compilePosts(content));
}

module.exports = { compileHome };
