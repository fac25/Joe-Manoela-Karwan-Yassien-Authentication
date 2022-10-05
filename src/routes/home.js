const { Layout } = require("../templates.js");
// import session model 
 
 function get(req, res) {
    const title = "Authorise yourself";
    const content = /*html*/ `
    <div>
      <h1>${title}</h1>
      <nav>
            <a href="/sign-up">Sign up</a> 
        or 
            <a href="/log-in">log in</a>
        </nav>
    </div>
    `
    const body = Layout({title, content});
    // destructuring?
    res.send(body);
 }


 module.exports = { get }