const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 3,
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: {
    type: [String],
    require: true,
  },
});

const book = mongoose.model("Book", schema);

module.exports = book;