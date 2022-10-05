const { Layout, homeHtml } = require("../templates.js");


function get(req, res) {
  const {title, content} = homeHtml();
  const body = Layout({ title, content});
  // destructuring?
  res.send(body);
}

module.exports = { get };
