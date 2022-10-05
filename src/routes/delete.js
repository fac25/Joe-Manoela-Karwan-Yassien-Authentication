const { removeStory } = require("../model/myStories");

function post(req, res) {
    // const sid = req.signedCookies.sid;
    // const session = getSession(sid);
    // const current_user = session && session.user_id;
    // if (!req.body.content || !current_user) {
    //   return res.status(401).send("<h1>Story submission failed</h1>");
    // }
    removeStory(req.body.id);
    res.redirect(`/stories`);
    //res.redirect(`/myStories/${session.user_id}`);
}

module.exports = { post };