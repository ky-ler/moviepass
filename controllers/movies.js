const Movie = require('../models/Movies')

module.exports = {
    getMovies: async (req, res) => {
        console.log(req.user)
        try {
            const movies = await Movie.find({ userId: req.user.id })
            const moviesLeft = await Movie.countDocuments({
                userId: req.user.id,
                // completed: false,
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
        try {
            await Movie.create({
                movieName: req.body.movieName,
                // rating: 5;
                userId: req.user.id,
            })
            console.log('Movie has been added!')
            res.redirect('/movies')
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
}
