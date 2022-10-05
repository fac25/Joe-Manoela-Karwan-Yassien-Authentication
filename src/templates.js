// Home HTML
function homeHtml() {
  const title = "Authorise Yourself";
  const content = /*html*/ `
    <div class ="container">
    <h1>${title}</h1>
      <nav class ="flex_container">
            <a href="/sign-up">Sign Up</a> 
            <a href="/log-in">Log In</a>
     </nav>
 </div>
    `
    return {title, content};
}
 
// Log in HTML

function logInHtml() {
  const title = "Log In";
  const content = /* html */ `
<div class="log-in-container">
<h1>${title}</h1>
<form class="log-in-form" method="POST" action="/log-in">
  <label for="email">Email</label>
  <input name="email" type="email" />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" />
  <button type="submit">log In</button>
</form>
</div>`;

return {title, content} 
}

// log in failed html 

function logInFailHtml() {

  return ` 
    <h1>login failed</h1>
    <a href="/sign-up">Sign up</a> 
        or 
    <a href="/log-in">log in</a>`
}

function Layout({ title, content }, error = {}, value = {}) {

  return /*html*/ `
    <!doctype html>
    <html lang="en">
      <head>
      <link rel ="stylesheet" href ="../style.css">
        <meta charset="UTF-8">
        <title>${title}</title>
      </head>
      <body>
      
          <main>
            ${content}
          </main>
        </div>
      </body>
    </html>
  `;
}

function sanitize(str) {
  return str.replaceAll('<', '&lt')
}

function validate(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}


module.exports = { homeHtml, logInHtml, logInFailHtml, Layout, sanitize, validate };
