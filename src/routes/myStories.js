const { Layout, sanitize } = require("../templates.js");
const { getAllMyStories } = require("../model/myStories");
const { getSession } = require("../model/sessions.js");
const { createStories } = require("../model/stories");

function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  const pageOwners_user_id = Number(req.params.user_id);

  if (sid === undefined || session === undefined) {
    return res.status(401).send(/*html*/ `
        <h1>Please log-in first to see your stories:</h1>
        <nav>
              <a href="/log-in">log in</a>
        </nav>
      `);
  } else if (session.user_id != pageOwners_user_id) {
    return res.status(401).send(/*html*/ `
      <h1>Please log-in first to see your stories:</h1>
      <nav>
            <a href="/log-in">log in</a>
      </nav>
    `);
  }

  const form = /*html*/ `
    <form method="POST" class="">
    <label for="story_title">Tell us your story's title:</label>
    <input type="text" name="story_title" id="story_title">
      
    <label for="actual_story">Write your story here:</label>
      <textarea name="actual_story" rows="4" cols="30"></textarea>
      <button>Share your story!</button>
   </form>`;

  const title = `My Stories`;
  const content = /*html*/ `
      <div class="">
        <h1>${title}</h1>

        <nav> 
          <a href="/stories">See everyone else's stories</a>
          <form method="POST" action="/logout"><button>Log out</button></form>
        </nav>

        <section>${form}</section>
        
        <ul class="">
          ${getAllMyStories(pageOwners_user_id)
            .map(
              (story) => `
              <li>
                <h2>${story.story_title}</h2>
                <h3>${story.username}</h3>
                <p>${story.actual_story}</p>
                <form method="post" action="/delete">
                <input type="hidden" name="id" value="${story.id}" readonly>
                <button type="submit">Delete</button>
                </form>
              </li>
              `
            )
            .reverse()
            .join("")}
        </ul>
      </div>
    `;
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
    createStories(
      sanitize(req.body.story_title),
      sanitize(req.body.actual_story),
      sanitize(req.params.user_id)
    );
    //res.redirect(`/stories`);
    res.redirect(`/myStories/${req.params.user_id}`);
  }
}

module.exports = { get, post };
