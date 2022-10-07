# Authorise Me
by _Joe Manoela Karwan Yassien Authentication App | Week 3. Authentication_


## Intro

### What are you building?

A website for users to share stories that they have written and see (and read) stories written by other users.

### Why are you building it?

- To fulfil the requirements of the Week 3 project on authentication.
- To practise skills learnt from server week and database week.
- To build a community of readers and writers.
- To make people smile because of the puns (i.e. authorisation in the sense of an authenticated user being able to do some action vs authorisation in the sense of people authorising themselves by submitting a story and becoming an author)

## Project scope 

### What are you not building?

We are not building a marketplace for books eg Amazon kindle.

### How did you decide what features were important?

We looked at the core user stories and acceptance criteria for this project and prioritised the features that would fulfil these given our limited build time and lack of experience with authentication.

## Project Plan

### How are you going to structure your sprints?

We will be doing a single two-day sprint because that is the only time allocated for this project on the course schedule.

###  What order are you going to build in?

We will build the site in parallel with each pair working simultaneously on a particular route until the full web app comes together.

### How did user research inform your plan?

We did not conduct user research for this project.


## Requirement analysis 

###  How will you ensure your project is accessible to as many users as possible?

We will use semantic html wherever possible and then conduct a google chrome lighthouse analysis as well as checking the a11y accessibility criteria to ensure our project is accessible to as many users as possible.

###  Are there any legal or regulatory requirements you should consider?

We are not using cookies to track user behaviour but merely for login and signup purposes so we do not need to worry about GDPR and cookie consent (I think?). 
We may also need to consider potential copyright issues if a user submits a story that has already been published by someone else.

### Security

- We handle security by authenticating users via hashed passwords stored in a database. 
- Each login creates a session which has a corresponding cookie and is stored in the database (stateful not stateless). 
- Cookies for a particular login auto-expire after 7 days. 
- We mitigate Cross-site Request Forgery (CSRF) attacks by using the ```SameSite=Lax``` and ```httpOnly: true``` attributes.


## Project learnings 

###  Did your team work effectively?

Yes.

### What would you do differently next time?

Take more scheduled breaks rather than working until a particular issue has been completed. 

Pay more attention to completing the documentation at an earlier stage (rather than just at the end).


## Research and findings 

###  What did you find out from user testing?

We learnt that some of routes were not displaying the css properly. We were able to solve this by changing the path in the href attribute of the link tag in the layout html template.


## Recommendations and conclusions 

###  What features would you prioritise to build next?

As part of our stretch goals which we did not have time to get to on this sprint we already identified some extra enhancement features to build next time; allow users to review and rate the stories, filter by rating etc.

###  Was the project a success?

Yes.


## Setup

Make sure you have Git and Node (v18) installed.

1. Clone this repo and `cd` into the directory
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the server.  
   
This uses the `nodemon` library to auto-restart the server when you save changes. 

This app already has example stories seeded into the database.

## Core Stories

- [x] As a creative user, I want to submit my own stories for others to enjoy.
- [x] As a nostalgic user, I want to come back to your site later and see the stories I posted are still there. 
- [x] As a curious user, I want to see stories other authors have posted. 
- [x] As a self conscious user, I want to be the only person allowed to delete my stuff.
