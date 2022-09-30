module.exports = {
  getIndex: (req, res) => {
    if (req.user) {
      res.redirect("/lists");
    } else {
      res.render("index.ejs", { user: req.user });
    }
  },
};
