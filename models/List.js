const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  listTitle: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("List", ListSchema);
