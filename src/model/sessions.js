const crypto = require("node:crypto");
const db = require("../database/db.js");



const select_session = db.prepare(/*sql*/ `
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = ?
`);

function getSession(sid) {
  return select_session.get(sid);
}



module.exports = {  getSession };