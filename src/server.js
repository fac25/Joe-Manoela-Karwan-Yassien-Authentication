// imports node modules from npm
const cookieParser = require("cookie-parser");
const express = require("express");
const home = require("./routes/home.js");
const logIn = require("./routes/log-in.js");
const logOut = require("./routes/log-out.js");
const signUp = require("./routes/sign-up.js");
const stories = require("./routes/stories.js");
const myStories = require("./routes/myStories.js");
const deleteFn = require("./routes/delete.js");

const server = express();

//To add css file
const staticHandler = express.static("public");

// Import routes from routes folder

const body = express.urlencoded({ extended: false });
const cookies = cookieParser(process.env.COOKIE_SECRET);

//middlewear
server.use(cookies);
server.use(staticHandler);

server.get("/sign-up", signUp.get);
server.post("/sign-up", body, signUp.post);
server.get("/", home.get);

server.get("/stories", stories.get);
server.get("/my-stories/:user_id", myStories.get);
server.post("/my-stories/:user_id", body, myStories.post);
server.post("/delete", body, deleteFn.post);
server.get("/log-in", logIn.get);
server.post("/log-in", body, logIn.post);
server.post("/logout", logOut.post);

module.exports = server;
