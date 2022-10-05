const { Layout } = require("../templates.js");

//form
// user name
// email address
// password
// button to submit

function get(req, res) {
  const title = "Create your account";
  const content = /*html*/ `
 
  <div>
  <h1>${title}</h1>
<form method="POST">
  <label for="username">username</label>
  <input id="username" name="username" type="text" />

  <label for="email">email</label>
  <input id="email" name="email" type="text" />

  <label for="password">password</label>
  <input id="password" name="password" type="text" />

  <button>Submit</button>
</form>
</div>


    
    `;

  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };
