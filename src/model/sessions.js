const db = require("../database/db");
const crypto = require("node:crypto");

const create_session = db.prepare(/*sql*/ `
  INSERT INTO sessions (id, user_id, expires_at)
  VALUES ($id, $user_id, DATE('now', '+7 days'))
`); //can we user select instead of returning

//id here is the session id
function createSession(user_id) {
  const id = crypto.randomBytes(18).toString("base64");
  create_session.run({ id, user_id });
  return id;
}

const select_session = db.prepare(/*sql*/ `
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = ?
`);

function getSession(sid) {
  return select_session.get(sid);
}

module.exports = { createSession, getSession };
