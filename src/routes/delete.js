const { removeStory } = require("../model/myStories");

function post(req, res) {
    removeStory(req.body.id);
    res.redirect(`/stories`);
}

module.exports = { post };