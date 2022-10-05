const db = require("../database/db");

const select_all_stories = db.prepare(/*sql*/ `
  SELECT 
    stories.id,
    stories.story_title,
    stories.actual_story,
    users.user_name AS username
    FROM stories JOIN users ON stories.user_id = users.id
  
`);

function getAllStories() {
  return select_all_stories.all();
}

const insert_stories = db.prepare(/*sql*/ `
  INSERT INTO stories (story_title, actual_story, user_id) VALUES ($story_title, $actual_story , $user_id)
  RETURNING id --, story_title, actual_story, created_at
`);

function createStories(story_title, actual_story, user_id) {
  return insert_stories.get({ story_title, actual_story, user_id});
}

module.exports = { getAllStories, createStories };