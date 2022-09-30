const fetch = require("node-fetch");
const Movie = require("../models/Movies");
const List = require("../models/List");

module.exports = {
  getMovies: async (req, res) => {
    // console.log(req.body);
    try {
      const movies = await Movie.find({ userId: req.user.id });
      // const movieYear = await Movie.find(movies.movieYear)
      // console.log(movies)
      const moviesLeft = await Movie.countDocuments({
        userId: req.user.id,
      });
      const activeList = await List.findOne({
        userId: req.user.id,
        isActive: true,
      });
      res.render("movies.ejs", {
        movies: movies,
        moviesLeft: moviesLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addMovie: async (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${process.env.API_KEY}&language=en-US`;
    // console.log(req);
    const activeList = await List.findOne({
      userId: req.user.id,
      isActive: true,
    });
    try {
      if (
        !(await Movie.findOne({
          movieId: req.body.movieId,
          userId: req.user._id,
          listId: activeList.id,
        }))
      ) {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.title);
        await Movie.create({
          movieId: req.body.movieId,
          movieTitle: data.title,
          movieYear: data.release_date.split("-")[0] || -1,
          userId: req.user._id,
          listId: activeList.id,
        });
        console.log("Movie has been added!");
      } else {
        await Movie.findOneAndDelete({
          movieId: req.body.movieId,
          userId: req.user._id,
          listId: activeList.id,
        });
        console.log("Movie has been deleted!");
      }
      // res.redirect(`/lists/${activeList.id}`);
      res.redirect(req.get("referer"));
    } catch (err) {
      console.log(err);
    }
  },
  deleteMovie: async (req, res) => {
    console.log(req);
    const activeList = await List.findOne({
      userId: req.user.id,
      isActive: true,
    });
    try {
      await Movie.deleteOne({ _id: req.params.id });
      console.log("Deleted Movie");
      res.redirect(`/lists/${activeList.id}`);
    } catch (err) {
      res.redirect(`/lists/${activeList.id}`);
    }
  },
  searchMovies: async (req, res) => {
    // console.log(req.user);
    if (!req.query.movieName) {
      res.redirect("/");
    }

    const movieTitle = req.query.movieName;
    let pageNumber = req.query.page;
    if (pageNumber === undefined) {
      pageNumber = 1;
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${movieTitle}&page=${pageNumber}`;

    let activeList;
    let activeListTitle;
    let activeListId;
    if (req.user !== undefined) {
      activeList = await List.findOne({
        userId: req.user.id,
        isActive: true,
      });
    }
    console.log(activeList);

    try {
      // Todo: Error handle empty query
      // if (movieTitle.length < 1) {
      //   res.redirect("back");
      // }
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      if (req.user && activeList !== null) {
        activeListTitle = activeList.listTitle;
        activeListId = activeList.id;
      }
      for (const movie of data.results) {
        if (req.user && activeList !== null) {
          if (
            !(await Movie.findOne({
              movieId: movie.id,
              userId: req.user.id,
              listId: activeList.id,
            }))
          ) {
            movie.onList = false;
          } else {
            movie.onList = true;
          }
        }
      }

      // console.log(req.params.movieName);
      // console.log(data.results);

      res.render("search.ejs", {
        hasActive: activeList !== null,
        activeList: activeListTitle,
        activeId: activeListId,
        movies: data.results,
        movieName: movieTitle,
        user: req.user,
        pageNumber: pageNumber,
        totalPages: data.total_pages,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // Working on adding top movies
  tmdbLists: async (req, res) => {
    // https://developers.themoviedb.org/3/movies/get-top-rated-movies
    let pageNumber = req.params.page;
    if (pageNumber === undefined) {
      pageNumber = 1;
    }

    let listTitle = req.params.listType;
    let list = req.params.listType;

    if (list === "top" || list === "Top Rated") {
      list = "top_rated";
      listTitle = "Top Rated";
    } else if (list === "now-playing" || list === "Now Playing") {
      list = "now_playing";
      listTitle = "Now Playing";
    }
    const url = `https://api.themoviedb.org/3/movie/${list}?api_key=${process.env.API_KEY}&language=en-US&page=${pageNumber}&region=US`;
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    let activeList;
    let activeListTitle;
    let activeListId;
    if (req.user !== undefined) {
      activeList = await List.findOne({
        userId: req.user.id,
        isActive: true,
      });
    }

    console.log(activeList);

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(req.user);
      if (req.user && activeList !== null) {
        activeListTitle = activeList.listTitle;
        activeListId = activeList.id;
      }
      for (const movie of data.results) {
        if (req.user && activeList !== null) {
          if (
            !(await Movie.findOne({
              movieId: movie.id,
              userId: req.user.id,
              listId: activeList.id,
            }))
          ) {
            movie.onList = false;
          } else {
            movie.onList = true;
          }
        }
      }
      res.render("tmdbMovies.ejs", {
        hasActive: activeList !== null,
        activeList: activeListTitle,
        activeId: activeListId,
        movies: data.results,
        listType: listTitle,
        pageNumber: pageNumber,
        user: req.user,
        url: req.params.listType,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
