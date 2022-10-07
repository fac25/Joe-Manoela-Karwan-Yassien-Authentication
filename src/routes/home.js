const { Layout } = require("../templates.js");


function get(req, res) {
  const title = "Authorise Yourself";
  const content = /*html*/ `
    <div class ="container">
    <h1>${title}</h1>
      <nav class ="flex_container">
            <a href="/sign-up">Sign Up</a> 
            <a href="/log-in">Log In</a>
     </nav>
 </div>
    `;
  const body = Layout({ title, content });
  // destructuring?
  res.send(body);
}

module.exports = { get };
