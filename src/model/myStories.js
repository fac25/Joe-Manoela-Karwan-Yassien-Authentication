const db = require("../database/db");

const select_all_my_stories = db.prepare(/*sql*/ `
  SELECT 
    stories.id,
    stories.story_title,
    stories.actual_story,
    users.user_name AS username
    FROM stories JOIN users ON stories.user_id = users.id
    WHERE users.id = ?
  
`);

function getAllMyStories(id) {
  return select_all_my_stories.all(id);
}

const delete_story = db.prepare(/*sql*/ `
  DELETE FROM stories WHERE id = ?
`);

function removeStory(id) {
  return delete_story.run(id);
}

module.exports = { getAllMyStories, removeStory };