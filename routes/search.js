const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");

router.get("/", moviesController.searchMovies);

module.exports = router;
