const { Layout } = require("../templates.js");
const { getAllStories } = require("../model/stories");
const { getSession } = require("../model/sessions.js");

function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);

  if (sid === undefined || session === undefined) {
    return res.status(401).send(/*html*/ `
      <h1>Please log-in (or sign-up) first to see all stories:</h1>
      <nav>
            <a href="/sign-up">Sign up</a> 
        or 
            <a href="/log-in">log in</a>
      </nav> 
    `);
  } else {
    const title = "Stories";
    const content = /*html*/ `
      <div class="stories-container">
        <h1>${title}</h1>
        <nav> 
        <div> 
         <a href= "/stories">Home</a>
         <a href="/myStories/${session.user_id}">Profile</a>
         </div>


          <form method="POST" action="/logout"><button>Log out</button></form>
        </nav>

        
        <ul class="story-card">
          ${getAllStories()
            .map(
              (story) => `
              <li>
                <h2>${story.story_title}</h2>
                <h3> Author: ${story.username}</h3>
                <p>${story.actual_story}</p>
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
}

module.exports = { get };
