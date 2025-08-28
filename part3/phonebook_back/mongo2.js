const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("no password");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Kat:${password}@cluster0.fd4djlf.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  importance: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/* const note = new Note({
  content: "Second note",
  importance: false,
});

note.save().then((result) => {
  console.log(result);
  mongoose.connection.close();
}); */

Note.find({importance: false,}).then(result => {
    result.forEach(note => {
    console.log(note)
  })
    mongoose.connection.close();
})
