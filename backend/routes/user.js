const router = require("express").Router();

let User = require("../models/user.model");
let Note = require("../models/note.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User added successfuly."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:username/notes").get((req, res) => {
  const username = req.params.username;
  Note.find({ username: username })
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:username/addnote").post((req, res) => {
  const notename = req.body.notename;
  const username = req.params.username;
  const text = req.body.text;

  const newNote = new Note({ notename, username, text });
  newNote
    .save()
    .then(() => res.json("Note added successfuly."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:username/update/:notename").post((req, res) => {
  const username = req.params.username;
  const notename = req.params.notename;

  Note.findOne({ username: username, notename: notename })
    .then((note) => {
      note.notename = req.body.notename;
      note.text = req.body.text;

      note.isNew = false;

      note
        .save()
        .then(() => res.json("Note updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:username/delete/:notename").delete((req, res) => {
  const username = req.params.username;
  const notename = req.params.notename;
  Note.findOneAndDelete({ username: username, notename: notename })
    .then((note) => res.json("Note deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
