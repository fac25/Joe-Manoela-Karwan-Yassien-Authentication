const { signUpHtml, emailExistHtml, Layout, sanitize } = require("../templates.js");
const { createSession } = require("../model/sessions.js");
const { checkEmailExists, createUser } = require("../model/users.js");
const bcrypt = require("bcryptjs");


function get(req, res) {
  const {title, content} = signUpHtml()
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
    const {title, content} = signUpHtml(value, error);
    const body = Layout({ title, content });

     return res.status(400).send(body)
  }

  const emailExists = checkEmailExists(email); // return either undefined(=unique_email), {email: email}

  if (emailExists) {
    return res.status(400).send(emailExistHtml());
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
