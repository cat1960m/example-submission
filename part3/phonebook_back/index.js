require("dotenv").config();

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

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    response.status(404).json({ error: "content missing" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  console.log("id", id);
  Person.findById(id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  console.log("id", id);
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log("result", result);
      if (result) {
        console.log("deleted", id);
        response.status(204).end();
      } else {
        console.log("no person  in DB with this id", id);
        response.status(204).json({ message: "no person  in DB with this id" });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;
  console.log("id", id);
  Person.findById(id)
    .then((result) => {
      if (!result) {
        console.log("no person  in DB with this id", id);
        return response.status(404).end();
      }

      result.name = name;
      result.number = number;
      result.save().then((correctedPerson) => {
        console.log("correctedPerson", correctedPerson);
        response.json(correctedPerson);
      });
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  console.log("unknown endpoint !!");
  response.status(404).send({ error: "unknown endpoint !!" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    console.log("error", error);
    response.status(400).json({ error: "malformatted id" });
    return;
  }

  next(error);
};

app.use(errorHandler);

console.log(" process.env.PORT", process.env.PORT);
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
