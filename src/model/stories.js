const db = require("../database/db");

const select_all_stories = db.prepare(/*sql*/ `
  SELECT 
    stories.id,
    stories.story_title,
    stories.actual_story,
    users.user_name AS username
    FROM stories JOIN users ON stories.user_id = users.id
  
`);
//id, user_name, story_title, actual_story FROM stories
function getAllStories() {
  return select_all_stories.all();
}

// const insert_confession = db.prepare(/*sql*/ `
//   INSERT INTO confessions (content, user_id) VALUES ($content, $user_id)
//   RETURNING id, content, created_at
// `);

// function createConfession(content, user_id) {
//   return insert_confession.get({ content, user_id });
// }

module.exports = { getAllStories };