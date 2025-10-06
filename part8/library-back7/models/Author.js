const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    unique: true,
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("Author", schema);
