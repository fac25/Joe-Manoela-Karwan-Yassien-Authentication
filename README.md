# Authorise Me
by _Joe Manoela Karwan Yassien Authentication App | Week 3. Authentication_

## Setup

Make sure you have Git and Node (v18) installed.

1. Clone this repo and `cd` into the directory
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the server.  
   This uses the `nodemon` library to auto-restart the server when you save changes. 

This app already has example stories seeded into the database.

# Core Stories

### - As a creative user, I want to submit my own stories for other to enjoy 
### - As a nostalgic user, I want to come back to your site later and see the stories I posted are still there. 
### - As a curious user, I want to see stories other authors have posted. 
## Stretch goal
### - As a self conscious user, I want to be the only person allowed to delete my stuff

# Security

### Our website stores the session and the user id in a cookie (stateful)
### We authenticate using hashed passwords?

### Users are authorised using the cookie?
### Authorization through cookie and database with expiry 

### We mitigate Cross-site Request Forgery (CSRF) attacks? We use SameSite=Lax and httpOnly: true
