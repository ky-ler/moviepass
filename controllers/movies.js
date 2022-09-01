const fetch = require('node-fetch')

const Movie = require('../models/Movies')

module.exports = {
    getMovies: async (req, res) => {
        console.log(req.body)
        try {
            const movies = await Movie.find({ userId: req.user.id })
            const movieYear = await Movie.find(movies.movieYear)
            // console.log(movies)
            const moviesLeft = await Movie.countDocuments({
                userId: req.user.id,
                // completed: false,
            })
            res.render('movies.ejs', {
                movies: movies,
                movieYear: movieYear,
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
                    movieName: req.body.movieTitle,
                    movieYear: req.body.movieYear,
                    // rating: 5;
                    userId: req.user._id,
                }))
            ) {
                await Movie.create({
                    movieName: req.body.movieTitle,
                    movieYear: req.body.movieYear,
                    // rating: 5;
                    userId: req.user._id,
                })
                console.log('Movie has been added!')
                res.redirect('/movies')
            } else {
                await Movie.findOneAndDelete({
                    movieName: req.body.movieTitle,
                    movieYear: req.body.movieYear,
                    // rating: 5;
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
        console.log(req.body)
        const movieTitle = req.body.movieName
        const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t='${movieTitle}'`

        try {
            const response = await fetch(url)
            const data = await response.json()
            let movieOnList = false

            const onList = Movie.findOne({
                userId: req.user._id,
                movieName: req.body.movieName,
                // movieYear: data.movieYear,
                // rating: 5;
            })
            // console.log(data.Year, data.Ratings[0])
            // console.log(onList)
            // console.log(data.Title)

            // This needs to be fixed
            if (onList) {
                movieOnList = true
            }
            res.render('movieSearch.ejs', {
                movieTitle: data.Title,
                movieYear: data.Year,
                movieRatings: data.Ratings,
                movieOnList: movieOnList,
            })

            // response.json('Searched movies')
            // res.redirect('/movies')
        } catch (err) {
            console.log(err)
        }
    },
}
