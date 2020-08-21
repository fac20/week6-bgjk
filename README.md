<img src="https://user-images.githubusercontent.com/59174800/90857777-bfb54800-e37c-11ea-9171-a76beac21375.png" align="right" />

 ![](https://img.shields.io/badge/Heroku-Deployed-purple) ![](https://img.shields.io/badge/Tests_pass-4-green)  ![](https://img.shields.io/badge/Dependencies-upto_date-brightgreen)



# Spill Your Beans 
Spill your beans a site for you to spill your toughts whether cute, angry or funny. From a pet peeve to compliment it's up to you what you spill.  
- The app was built using nodejs and postgres


## Table of content :scroll:
- [Installation :electric_plug:](#Installation-:electric_plug:)
- [User Stories :postal_horn::standing_person:](#User-Stories-:postal_horn::standing_person:)
- [File structure and Wireframe :memo::pencil:](#File-structure-and-Wireframe)
- [Features :sparkles:](#Features)
- [Tools :hammer_and_wrench:](#Tools)
- [Team :superhero_woman: :superhero_woman: :superhero_man::superhero_man:](Team)

## Installation :electric_plug: 

To install and view this app on your local machine follow the below steps:
### Clone
Clone this repo into your desired folder on your local machine using ``` git clone https://github.com/fac20/week6-bgjk.git```
### Set-up
- Connect your local database with init.sql file  
- Set up environment variables for the json secret key, database_url and test_database_url(which is the local database)
- Run:
    - ``` npm install ``` to install all dependencies  
    - ``` npm run dev ``` to start the server using nodemon  
    - ``` npm test ``` to run test locally

  <video controls="true" allowfullscreen="true">
  <iframe src="./installation-guide.mp4" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

  </video>
Please message if you have any questions. 


## User Stories :postal_horn::standing_person: 
![ ](https://media.giphy.com/media/l3nWqzkMR5diFKkkU/giphy.gif)


### Core 
- [x] As a user, I want to: submit information to your site for anyone to see
- [x] As a user, I want to: come back to your site later and see what I posted is still there
- [ ] As a user, I want to: be the only person allowed to delete my stuff
- [x] As A user I want to be able to post something only when I'm logged in
- [x] As a user I wa t to see an error message if I haven't signed up before trying to log in


### Acceptance Criteria 
- [x] Forms for users to sign up and log in
- [x] A form for users to submit data only accessible to logged in users
- [x] A page showing all the data
- [ ] A way for logged in users to delete their own data
- [x]Semantic form elements with correctly associated labels
- [x] A Postgres database hosted on Heroku
- [x] Tests for server routes and database access
- [x] Not process user input as SQL commands
- [x] Hidden environment variables (i.e. not on GitHub)

### Stretch criteria
- [ ] A user page that shows everything posted by a single user
- [x] GitHub Actions CI setup to run your tests when you push


# File structure and Wireframe 

![Website on desktop screeen](https://user-images.githubusercontent.com/59174800/90218905-d7c91c80-ddfc-11ea-9875-41f28094a162.png)
![Website on mobile device vertically](https://user-images.githubusercontent.com/59174800/90220273-cb928e80-ddff-11ea-8056-6986e45b32cf.png)
![Website on mobile view horizontally](https://user-images.githubusercontent.com/59174800/90220307-dd743180-ddff-11ea-85e4-c2a39d4fb43e.png)


## Features  
- The webapp contains 3 forms - Sign-up, login and post (each with their own handler functions)
- A forum where users can post, read and delete* posts
- All user data is stored in a remote heroku database - 
    - The database contains posts and users table.
    - The users table contains users information which has a passwords column which is users hashed passwords using bcrypt
- User log in authentication is done by checking if initially generated json web token exists in users cookies bar

## Tools



## Team
- Josh (Scrum facilitator)
- Azizi (Deployment)
- Ephie (Design)
- Khadija (Quality)

