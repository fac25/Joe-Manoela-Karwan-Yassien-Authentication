const { Layout, logInHtml, logInFailHtml} = require("../templates.js");
const { createSession, getSession } = require("../model/sessions.js");
const { getUserByEmail } = require("../model/users.js");
const bcrypt = require("bcryptjs");


function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  if (session) {
    return res.redirect("/stories")
  }
  const {title, content} = logInHtml()
  const body = Layout({ title, content });
  res.send(body);
}


function post(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!email || !password || !user) {
    return res.status(400).send(logInFailHtml());
  } else {
    bcrypt.compare(password, user.hash).then((match) => {
      if (!match) {
        return res.status(400).send(logInFailHtml());
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
