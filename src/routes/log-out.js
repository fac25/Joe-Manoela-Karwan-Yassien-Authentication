// get request /logout
// delete session from the table
// clear the cookie
// redirect to homepage
const { removeSession } = require("../model/sessions.js")

function post(req, res) {
    const sid = req.signedCookies.sid;
    removeSession(sid);
    res.clearCookie("sid");
    res.redirect("/")
}

module.exports = { post }