# Joe Manoela Karwan Yassien Authentication
## Week 3: Authentication 


///////////////////////////

# Core Stories

### As a creative user, I want to submit my own stories for other to enjoy 
### As a nostalgic user, I want to come back to your site later and see the stories I posted are still there. 
### As a curious user, I want to see stories other authors have posted. 

# End Goal

### As a self conscious user, I want to be the only person allowed to delete my stuff

///////////////////////////


### Will you store session info in a cookie (stateless) or in your database (stateful)?

Store the session and the user id in a cookie (stateful)

###  How will you check a user’s identity (authentication)?

Email/Password login  
cookies 
store hash in database 

### How will you control what actions a user can take (authorization)?

authorization through cookie and database with expiry 

### How will you mitigate Cross-site Request Forgery (CSRF) attacks?

SameSite=Lax
httpOnly: true
