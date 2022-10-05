// imports node modules from npm
const cookieParser = require("cookie-parser");
const express = require("express");

// Import routes from routes folder
const home = require("./routes/home.js");
const logIn = require("./routes/log-in.js");
const logOut = require("./routes/log-out.js");
const signUp = require("./routes/sign-up.js");
const stories = require("./routes/stories.js");
const users = require("./routes/users.js");

const cookie = cookieParser(process.env.COOKIE_SECRET);

const server = express();

module.exports = server;
