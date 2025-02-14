const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isImportant: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
