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
 
// 

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


module.exports = { homeHtml, Layout, sanitize, validate };
