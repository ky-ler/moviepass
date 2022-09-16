# MoviePass

Create movie lists and share them with your friends. 

Created using MVC architecture, user authentication, and [TMDB's API](https://www.themoviedb.org/).

> View live deployment [here](https://moviepass.freezi.me/)

---

# Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, node-fetch, nodemon, passport, passport-local, validator

---

# Things to add

- Get an API key from [TMDB](https://www.themoviedb.org/).
- Create a `.env` file and add the following as `key=value`
  - PORT=2121 (can be any port example: 3000)
  - DB_STRING=`your database URI`
  - API_KEY=`your TMDB API key`
  - NODE_ENV=`dev` or `production`

---

# To Do

- (Ongoing) Style pages using Tailwind CSS
- Community lists (Upvote based?)
- Possibly add TV Shows and Anime lists
