// imports node modules from npm
const cookieParser = require("cookie-parser");
const express = require("express");

// Import routes from routes folder
const home = require("./routes/home.js");
const logIn = require("./routes/log-in.js");
const logOut = require("./routes/log-out.js");
const signUp = require("./routes/sign-up.js");
const stories = require("./routes/stories.js");
const myStories = require("./routes/myStories.js");
const users = require("./routes/users.js");

const body = express.urlencoded({ extended: false });
const cookies = cookieParser(process.env.COOKIE_SECRET);

const server = express();

server.use(cookies);

server.get("/", home.get);
server.get("/stories", stories.get)
server.get("/myStories/:user_id", myStories.get)
server.post("/myStories/:user_id", body, myStories.post)

module.exports = server;
