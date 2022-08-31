const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    movieName: {
        type: String,
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
