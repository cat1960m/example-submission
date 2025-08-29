const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

//const password = process.argv[2];

//const url = `mongodb+srv://Kat:${password}@cluster0.fd4djlf.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

const url = process.env.MONGODB_URI;

console.log("url", url);

mongoose
  .connect(url)
  .then(() => console.log("Connent to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (value) => {
        const parts = value.split("-");

        if (
          parts.length !== 2 ||
          ![2, 3].includes(parts[0].length) ||
          /^\d+$/.test(parts[0]) === false ||
          /^\d+$/.test(parts[1]) === false
        ) {
          return false;
        }

        return true;
      },
      message: (props) => `${props.value} is incorrect number format`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
