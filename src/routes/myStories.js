const { logInFirstHtml, submitStoryHtml, Layout, sanitize } = require("../templates.js");
const { getSession } = require("../model/sessions.js");
const { createStories } = require("../model/stories");


function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  const pageOwners_user_id = Number(req.params.user_id);

  if (!sid  || !session) {
    return res.status(401).send(logInFirstHtml());
  } else if (session.user_id != pageOwners_user_id) {
    return res.status(401).send(logInFirstHtml());
  }

  const {title, content} = submitStoryHtml(session.user_id, pageOwners_user_id);
  
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  const current_user = session && session.user_id;

  if (req.params.user_id != current_user) {
    return res.status(401).send(/* html */ `
      <h1>Story submission failed</h1>
      <h2>Please log-in first to submit a story:</h2>
        <nav>
              <a href="/log-in">log in</a>
        </nav>
      `);
  } else {
    if(!req.body.actual_story) {
      return res.send(`
      <h1>Good try! You need to actually write a story please!</h1>
      <a href="/my-stories/${req.params.user_id}">I'm ready to write a story</a>
      `)
    }
    createStories(
      sanitize(req.body.story_title),
      sanitize(req.body.actual_story),
      sanitize(req.params.user_id)
    );
    //res.redirect(`/stories`);
    res.redirect(`/my-stories/${req.params.user_id}`);
  }
}

module.exports = { get, post };
