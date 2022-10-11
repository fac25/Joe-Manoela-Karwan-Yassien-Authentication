const { notLoggedInToStoriesHtml, storiesHtml, Layout } = require("../templates.js");
const { getSession } = require("../model/sessions.js");


function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);

  if (!sid || !session) {
    return res.status(401).send(notLoggedInToStoriesHtml());
  } else {
    const {title, content} = storiesHtml(session.user_id);
    const body = Layout({ title, content });
    res.send(body);
  }
}

module.exports = { get };
