module.exports = {
  getIndex: (req, res) => {
    if (req.user) {
      res.redirect("/lists");
    } else res.render("index.ejs");
  },
  getChangelog: (req, res) => {
    res.render("changelog.ejs");
  },
};
