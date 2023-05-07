# MoviePass

Create movie lists and share them with your friends.

Created using MVC architecture, user authentication, and [TMDB's API](https://www.themoviedb.org/).

> I have taken the live site down and uploaded images of the site below

---

## Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, node-fetch, nodemon, passport, passport-local, validator

---

## Steps to Run Locally

- Get an API key from [TMDB](https://www.themoviedb.org/).
- Create a `.env` file and add the following as `key=value`
  - PORT=2121 (can be any port example: 3000)
  - DB_STRING=`your database URI`
  - API_KEY=`your TMDB API key`
  - NODE_ENV=`dev` or `production`

---

## Pictures

Example of a pre-curated list "Now Playing"

!["Now playing" list](https://github.com/ky-ler/moviepass/raw/main/media/now_playing.png)

Example of my "My Lists" page

!["My Lists" page](https://github.com/ky-ler/moviepass/raw/main/media/my_lists.png)

Example showing off one of my lists

![Movie List example](https://github.com/ky-ler/moviepass/raw/main/media/list_example.png)

Search results example

![Search for movie example](https://github.com/ky-ler/moviepass/raw/main/media/search.png)
