// const { getSession } = require("../model/session.js");
const { Layout } = require("../templates.js");
const { getAllStories } = require("../model/stories");

console.log(getAllStories)

function get(req, res) {
  const title = "Your secrets";
  const content = /*html*/ `
      <div class="Cover">
        <h1>${title}</h1>
        <ul class="Center Stack">
          ${getAllStories()
            .map(
              (story) => `
              <li>
                <h2>${story.story_title}</h2>
                <p>${story.actual_story}</p>
              </li>
              `
            )
            .join("")}
        </ul>
      </div>
    `;
  const body = Layout({ title, content });
  res.send(body);
}



module.exports = { get }