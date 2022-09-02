const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
    },
    movieDisplayName: {
        type: String,
        required: true,
    },
    movieYear: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Movie', MovieSchema)
