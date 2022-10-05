const db = require("../database/db.js");

const check_email = db.prepare(/* sql */ `
SELECT email
FROM users
WHERE email = ?
`);

function checkEmailExists(email) {
  return check_email.get(email);
}

const create_user = db.prepare(/* sql */ `
INSERT INTO users (user_name, email, hash)
VALUES ($user_name, $email, $hash )
RETURNING id`);

function createUser(user_name, email, hash) {
  return create_user.get({ user_name, email, hash });
}

module.exports = { checkEmailExists, createUser };
