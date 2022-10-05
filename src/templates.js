
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

module.exports = { Layout, sanitize, validate };
