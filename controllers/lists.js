const List = require("../models/List");
const Movie = require("../models/Movies");
const User = require("../models/User");

module.exports = {
  getAll: async (req, res) => {
    // console.log(req.body);
    try {
      const lists = await List.find({ userId: req.user.id });
      const allLists = await List.countDocuments({
        userId: req.user.id,
      });
      res.render("lists.ejs", {
        lists: lists,
        allLists: allLists,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getList: async (req, res) => {
    // console.log(req.user);
    const moviesOnList = await Movie.find({ listId: req.params.id });
    let listInfo = await List.find({ _id: req.params.id });
    let listUser = await User.findOne({ userId: req.params.id });
    let isAuthed;

    console.log(listInfo[0].userId);

    if (req.user) {
      isAuthed = listInfo[0].userId == req.user.id;
    } else {
      isAuthed = false;
    }
    try {
      if (listInfo.length < 1) {
        res.redirect("/lists");
      } else {
        res.render("movies.ejs", {
          listId: req.params.id,
          listTitle: listInfo[0].listTitle,
          listUser: listUser,
          movies: moviesOnList,
          user: req.user,
          isAuthed: isAuthed,
          isActive: listInfo[0].isActive,
        });
        // console.log(isAuthed && listInfo[0].isActive);
      }
    } catch (err) {
      console.log(err);
    }
  },
  createList: async (req, res) => {
    try {
      console.log(!(await List.findOne({ userId: req.user.id })));
      let active = false;
      if (!(await List.findOne({ userId: req.user.id })) === true) {
        await List.create({
          listTitle: req.body.listTitle,
          userId: req.user._id,
          isActive: true,
        });
      } else {
        await List.create({
          listTitle: req.body.listTitle,
          userId: req.user._id,
          isActive: false,
        });
      }
      const newList = await List.findOne({ userId: req.user.id })
        .sort({ field: "asc", _id: -1 })
        .limit(1);
      console.log(`${newList.listTitle} has been created!`);
      res.redirect(`/lists/${newList.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteList: async (req, res, next) => {
    const lists = await List.find({ userId: req.user.id });
    const allLists = await List.countDocuments({
      userId: req.user.id,
    });
    try {
      if ((await List.countDocuments({ userId: req.user.id })) >= 2) {
        await List.deleteOne({ userId: req.user.id, _id: req.params.id });
        await Movie.deleteMany({ userId: req.user.id, listId: req.params.id });

        if (!(await List.findOne({ userId: req.user.id }))) {
          return;
        } else {
          await List.findOneAndUpdate({ userId: req.user.id }, [
            { $set: { isActive: true } },
          ]);
          let active = await List.findOne({
            userId: req.user.id,
            isActive: true,
          });
          console.log(`Made list: ${active.listTitle} active`);
        }
        console.log("Deleted List");
      } else {
        console.log("Cannot delete list if only 1 list exists");
        throw new Error("Cannot delete list if only one list exists");
      }
      res.redirect("/lists");
    } catch (err) {
      console.log(err);
      //   next(err);
      res.render("error", { error: err });
    }
  },
  makeActive: async (req, res) => {
    console.log(req.params);
    try {
      await List.findOneAndUpdate({ userId: req.user.id, isActive: true }, [
        {
          $set: { isActive: false },
        },
      ]);
      await List.findOneAndUpdate({ userId: req.user.id, _id: req.params.id }, [
        { $set: { isActive: true } },
      ]);

      let currentlyActive = await List.findOne({
        userId: req.user.id,
        isActive: true,
      });
      console.log(currentlyActive.id);
      console.log(`Made ${currentlyActive.listTitle} active`);
      res.redirect(`/lists/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.redirect(`/lists/${req.params.id}`);
    }
  },
};
