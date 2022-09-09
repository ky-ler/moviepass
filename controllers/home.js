module.exports = {
  getIndex: (req, res) => {
    if (req.user) {
      res.redirect("/movies");
    } else res.render("index.ejs");
  },
};
