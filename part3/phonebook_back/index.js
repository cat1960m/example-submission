require('dotenv').config()

const express = require("express");
const Person = require("./modules/person");
const morgan = require("morgan");

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);


app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint !!" });
};

app.use(unknownEndpoint);

console.log(" process.env.PORT", process.env.PORT);
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
