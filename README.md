# Introduction

A Simple Movies List App using MVC architecture, user authentication, and [TMDB's API](https://www.themoviedb.org/).

---

# Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, node-fetch, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install`

---

# Things to add

-   Get an API key from [TMDB](https://www.themoviedb.org/).
-   Create a `.env` file and add the following as `key=value`
    -   PORT=2121 (can be any port example: 3000)
    -   DB_STRING=`your database URI`
    -   API_KEY=`your TMDB API key`

---

# To Do

-   (Currently) Changing from OMDb API to TMDB API for fetching movies
-   Change "Add to List" button to "Remove from List" if movie exists in your list
-   Give user feedback when adding to/removing from list
-   Update homepage and login/logout pages -- add more information
-   Style pages
-   Add watch list
-   Create shareable lists
-   Possibly add TV Shows and Anime lists
-   Community lists (Upvote based?)
