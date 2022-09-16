const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  movieYear: {
    type: Number,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  listId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
