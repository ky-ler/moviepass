const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, moviesController.getMovies);

router.post("/addMovie", moviesController.addMovie);

router.get("/search", moviesController.searchMovies);

router.delete("/deleteMovie/:id", moviesController.deleteMovie);

module.exports = router;
