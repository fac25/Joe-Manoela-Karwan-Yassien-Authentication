function Layout({ title, content }) {
  return /*html*/ `
    <!doctype html>
    <html lang="en">
      <head>
      <link rel ="stylesheet" href ="style.css">
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

module.exports = { Layout };
