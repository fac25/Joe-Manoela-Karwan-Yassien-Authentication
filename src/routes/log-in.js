const { Layout } = require("../templates.js");
const { createSession, getSession } = require("../model/sessions.js");
const { getUserByEmail } = require("../model/users.js");
const bcrypt = require("bcryptjs");

function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);

  if (session) {
    return res.redirect("/stories")
  }

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

  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!email || !password || !user) {
    return res.status(400).send(`
    
    <h1>login failed</h1>

    <a href="/sign-up">Sign up</a> 
       or 
    <a href="/log-in">log in</a>`);
  } else {
    bcrypt.compare(password, user.hash).then((match) => {
      if (!match) {
        return res.status(400).send(`
    
            <h1>login failed</h1>
            <a href="/sign-up">Sign up</a> 
               or 
            <a href="/log-in">log in</a>`);
      } else {
        const sessionId = createSession(user.id);
        res.cookie("sid", sessionId, {
          signed: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "lax", //protect from csrf
          httpOnly: true, //protect from xss
        });
        res.redirect(`/stories`);
      }
    });
  }
}

module.exports = { get, post };
