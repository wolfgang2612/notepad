const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    notename: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({ notename: 1, username: 1 }, { unique: true });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
