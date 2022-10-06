const { Layout } = require("../templates.js");
const { createSession } = require("../model/sessions.js");
const { checkEmailExists, createUser } = require("../model/users.js");
const bcrypt = require("bcryptjs");

function get(req, res) {
  const title = "Create your account";
  const content = /*html*/ `
 
  <div>
  <h1>${title}</h1>
<form method="POST">
  <label for="username">username</label>
  <input id="username" name="username" type="text" />

  <label for="email">email</label>
  <input id="email" name="email" type="email" />

  <label for="password">password</label>
  <input id="password" name="password" type="password" />

  <button>Submit</button>
</form>
</div>`;

  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // to do validation
    return res.status(400).send(`<h1>Please complete all fields</h1>`);
  }

  const emailExists = checkEmailExists(email); // return either undefined(=unique_email), {email: email}

  if (emailExists) {
    return res.status(400).send(
      `<h1>Email already registered</h1>
            <p> 
            please <a href="/log-in">log-in</a>
             or 
             <a href="/sign-up">sign-up</a> with another email
            </p> `
    );
  }

  bcrypt.hash(password, 12).then((hash) => {
    //returns an id for that user
    const newUser = createUser(username, email, hash); // takes 3, returns {id: ?} // CREATE THIS QUERY in model/user.js
    //const newUserId = newUser.id; //45
    const newSessionId = createSession(newUser.id); // takes user_id, returns session_id

    res.cookie("sid", newSessionId, {
      signed: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });
    res.redirect("/stories");
  });

  // 1. check if email exists in db
  // 2. if exists: display message: "user already exists"+btn "login" or "signup with another email"
  // 3. hash password
  // 4. store in database, returns new user id
  // 5. user new user id to create session, return a session id
  // 6. TO DO store session id in cookies
  // 7. TO DO if all correct, redirect to /stories
}

module.exports = { get, post };
