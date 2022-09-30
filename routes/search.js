const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const { ensureAuth } = require("../middleware/auth");

router.get("/", moviesController.searchMovies);

module.exports = router;
