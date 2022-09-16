const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const { ensureAuth } = require("../middleware/auth");

router.post("/addMovie", ensureAuth, moviesController.addMovie);

router.delete("/deleteMovie/:id", ensureAuth, moviesController.deleteMovie);

module.exports = router;
