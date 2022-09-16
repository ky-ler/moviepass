const express = require("express");
const router = express.Router();
const listsController = require("../controllers/lists");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, listsController.getAll);

router.get("/:id", listsController.getList);

router.post("/createList", listsController.createList);

router.put("/makeActive/:id", ensureAuth, listsController.makeActive);

router.delete("/deleteList/:id", ensureAuth, listsController.deleteList);

module.exports = router;
