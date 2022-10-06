const { Layout, sanitize, validate } = require("../templates.js");
const { createSession } = require("../model/sessions.js");
const { checkEmailExists, createUser } = require("../model/users.js");
const bcrypt = require("bcryptjs");



function get(req, res) {
  const title = "Create Your Account";
  const content = /*html*/ `
 
<div class= "sign-up-container">
  <h1>${title}</h1>
<form class="sign-up-form" method="POST">

  <label for="username">username</label>
  <input id="username" name="username" type="text"/>

    <label for="email">email</label>
    <input id="email" name="email" type="email" />


    <label for="password">Password</label>
    <input id="password" name="password" type="password" />

  <button>Submit</button>
</form>
</div>`;

  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  let error = {};
  let value = {};
  
  let { username, email, password } = req.body;
  username = sanitize(username);
  error = {};
  if (!username || !email || !password) {
    
    if (!username && !email) {
      error.username = "Please enter your username";
      
      error.email = "Please enter your email";
    }
    if (!username) {
      error.username = "Please enter your username";
      // error.email = "";
      value.email = email;
    }
    if (!email) {
      error.email = "Please enter your email";
      value.username = username;
    }
    if (!password) {
      error.password = "Please enter a password";
    }
    const title = "Create your account";
    const content = /*html*/ `
    <div>
    <h1>${title}</h1>
    <form method="POST">
    <label for="username">username</label>
    <input id="username" name="username" type="text" value='${value.username ? value.username : ''}'/>
    ${validate(error.username)}
    <label for="email">email</label>
    <input id="email" name="email" type="email" value='${value.email ? value.email : ''}'/>
    ${validate(error.email)}
    <label for="password">password</label>
    <input id="password" name="password" type="password" />
    ${validate(error.password)}
    <button>Submit</button>
  </form>
  </div>`;

  const body = Layout({ title, content }, error, value);

     return res.status(400).send(body)
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
