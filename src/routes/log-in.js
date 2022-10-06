const { Layout } = require("../templates.js");
const { createSession } = require("../model/sessions.js");
const { getUserByEmail } = require("../model/users.js");
const bcrypt = require("bcryptjs");

function get(req, res) {
  const title = "Log In";
  const content = `
  <header>
     <h1>${title}</h1>
  </header>

<section>
<form method="POST" action="/log-in">
  <label for="email">email</label>
  <input name="email" type="email" />

  <label for="password">password</label>
  <input type="password" name="password" id="password" />

  <button type="submit">log In</button>
</form>
</section>`;

  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { email, passowrd } = req.body;
  const user = getUserByEmail(email);

  if (!email || !passowrd || !user) {
    return res.status(400).send(`
    
    <h1>login failed</h1>

    <a href="/sign-up">Sign up</a> 
       or 
    <a href="/log-in">log in</a>`);
  } else {
    bcrypt.compare(passowrd, user.hash).then((match) => {
      if (match === false) {
        return res.status(400).send(`
    
            <h1>login failed</h1>
            <a href="/sign-up">Sign up</a> 
               or 
            <a href="/log-in">log in</a>`);
      } else {
        const sessionId = createSession(user.id);
        res.cookie("sid", sessionId, {
          signed: true,
          maxAge: 6000,
          sameSite: "lax", //protect from csrf
          httpOnly: true, //protect from xss
        });
        res.redirect(`/stories`);
      }
    });
  }
}

module.exports = { get, post };
