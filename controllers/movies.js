const fetch = require('node-fetch')

const Movie = require('../models/Movies')

module.exports = {
  getMovies: async (req, res) => {
    console.log(req.body)
    try {
      const movies = await Movie.find({ userId: req.user.id })
      // const movieYear = await Movie.find(movies.movieYear)
      // console.log(movies)
      const moviesLeft = await Movie.countDocuments({
        userId: req.user.id,
      })
      res.render('movies.ejs', {
        movies: movies,
        moviesLeft: moviesLeft,
        user: req.user,
      })
    } catch (err) {
      console.log(err)
    }
  },
  addMovie: async (req, res) => {
    console.log(req.body)
    try {
      if (
        !(await Movie.findOne({
          movieId: req.body.movieId,
          userId: req.user._id,
        }))
      ) {
        await Movie.create({
          movieId: req.body.movieId,
          movieTitle: req.body.movieTitle,
          movieYear: req.body.movieYear,
          userId: req.user._id,
        })
        console.log('Movie has been added!')
        res.redirect('/movies')
      } else {
        await Movie.findOneAndDelete({
          movieId: req.body.movieId,
          userId: req.user._id,
        })
        console.log('Movie has been deleted!')
        res.redirect('/movies')
      }
    } catch (err) {
      console.log(err)
    }
  },
  deleteMovie: async (req, res) => {
    console.log(req.body.movieIdFromJSFile)
    try {
      await Movie.findOneAndDelete({ _id: req.body.movieIdFromJSFile })
      console.log('Deleted Movie')
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  },
  searchMovies: async (req, res) => {
    console.log(req.query)
    const movieTitle = req.query.movieName
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${movieTitle}'`

    try {
      const response = await fetch(url)
      const data = await response.json()

      for (const movie of data.results) {
        if (
          !(await Movie.findOne({
            movieId: movie.id,
            userId: req.user._id,
          }))
        ) {
          movie.onList = false
        } else {
          movie.onList = true
        }
      }

      res.render('movieSearch.ejs', {
        movies: data.results,
        movieName: req.query.movieName,
      })
    } catch (err) {
      console.log(err)
    }
  },
}
