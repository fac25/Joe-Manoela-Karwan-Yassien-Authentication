const { getAllMyStories } = require("./model/myStories")
const { getAllStories } = require("./model/stories.js");

// Home HTML
function homeHtml() {
  const title = "Authorise Yourself";
  const content = /*html*/ `
    <div class ="container">
    <h1>${title}</h1>
      <nav class ="flex_container">
            <a href="/sign-up">Sign Up</a> 
            <a href="/log-in">Log In</a>
     </nav>
 </div>
    `
    return {title, content};
}
 
// Log in HTML

function logInHtml() {
  const title = "Log In";
  const content = /* html */ `
<div class="log-in-container">
<h1>${title}</h1>
<form class="log-in-form" method="POST" action="/log-in">
  <label for="email">Email</label>
  <input name="email" type="email" />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" />
  <button type="submit">log In</button>
</form>
</div>`;

return {title, content} 
}

// log in failed html 

function logInFailHtml() {

  return ` 
    <h1>login failed</h1>
    <a href="/sign-up">Sign up</a> 
        or 
    <a href="/log-in">log in</a>`
}

// Login failed HTML

function logInFirstHtml() {
  return `
  <h1>Please log-in first to see your stories:</h1>
  <nav>
        <a href="/log-in">log in</a>
  </nav>
`
}
// My stories HTML

function submitStoryHtml(session_user_id, pageOwners_user_id ) {

  const form = /*html*/ `
    <form class="sign-up-form" method="POST" class="">
    <label for="story_title">Tell us your story's title:</label>
    <input type="text" name="story_title" id="story_title">
    <label for="actual_story">What's your story, user?</label>
      <textarea name="actual_story" rows="4" cols="30"></textarea>
      <button>Share your story!</button>
   </form>`;

  const title = `My Stories`;
  const content = /*html*/ `
      <div class="stories-container">
        <h1>${title}</h1>
        <nav> 
        <div>
          <a href= "/stories">Home</a>
          <a href="/my-stories/${session_user_id}">Profile</a>
        </div>
          <form method="POST" action="/logout"><button>Log out</button></form>
        </nav>

       <div class="sign-up-container"><h1>write your story</h1>${form}</div>
        
        <ul class="story-card">
          ${getAllMyStories(pageOwners_user_id)
            .map(
              (story) => `
              <li>
                <h2>${story.story_title}</h2>
                <h3>${story.username}</h3>
                <p>${story.actual_story}</p>
                <form method="post" action="/delete">
                <input type="hidden" name="id" value="${story.id}" readonly>
                <button type="submit">Delete</button>
                </form>
              </li>
              `
            )
            .reverse()
            .join("")}
        </ul>
      </div>
    `;

  return {title, content}
}

// Sign-up HTML
function signUpHtml(value = {}, error = {}) {

  const title = "Create your account";
  const content = /*html*/ `
    <div class="sign-up-container">
    <h1>${title}</h1>
    <form method="POST" class="sign-up-form">
    <label for="username">username</label>
    <input id="username" name="username" type="text" value='${value.username ? value.username : ''}'/>
    ${validate(error.username)}
    <label for="email">email</label>
    <input id="email" name="email" type="email" value='${value.email ? value.email : ''}'/>
    ${validate(error.email)}
    <label for="password">password</label>
    <input id="password" name="password" type="password" />
    ${validate(error.password)}
    <button>Submit</button>
  </form>
  </div>`;

return {title, content}
}

// Email exist HTML
function emailExistHtml() {
  return /*html*/ `
  <h1>Email already registered</h1>
  <p> 
  please <a href="/log-in">log-in</a>
    or 
    <a href="/sign-up">sign-up</a> with another email
  </p>
  `
}
// Stories login to view HTML 

function notLoggedInToStoriesHtml() {
  return /*html*/ `
  <h1>Please log-in (or sign-up) first to see all stories:</h1>
  <nav>
        <a href="/sign-up">Sign up</a> 
    or 
        <a href="/log-in">log in</a>
  </nav> 
`
}
// Show all stories

function storiesHtml(session_user_id) {
  
  const title = "Stories";
  const content = /*html*/ `
    <div class="stories-container">
      <h1>${title}</h1>
      <nav> 
      <div> 
       <a href= "/stories">Home</a>
       <a href="/my-stories/${session_user_id}">Profile</a>
       </div>


        <form method="POST" action="/logout"><button>Log out</button></form>
      </nav>

      
      <ul class="story-card">
        ${getAllStories()
          .map(
            (story) => `
            <li>
              <h2>${story.story_title}</h2>
              <h3> Author: ${story.username}</h3>
              <p>${story.actual_story}</p>
            </li>
            `
          )
          .reverse()
          .join("")}
      </ul>
    </div>
  `;

  return {title, content}
}

// Layout HTML

function Layout({ title, content }) {

  return /*html*/ `
    <!doctype html>
    <html lang="en">
      <head>
      <link rel ="stylesheet" href ="../style.css">
        <meta charset="UTF-8">
        <title>${title}</title>
      </head>
      <body>
      
          <main>
            ${content}
          </main>
        </div>
      </body>
    </html>
  `;
}

function sanitize(str) {
  return str.replaceAll('<', '&lt')
}

function validate(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}

module.exports = { 
  homeHtml, 
  logInHtml, 
  logInFailHtml, 
  logInFirstHtml, 
  submitStoryHtml, 
  signUpHtml, 
  emailExistHtml, 
  notLoggedInToStoriesHtml,
  storiesHtml,
  Layout, 
  sanitize, 
  validate };
