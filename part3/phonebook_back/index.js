const express = require("express");
var morgan = require('morgan')
const cors =require('cors')

const app = express();

app.use(express.static('dist'))
app.use(express.json())
app.use(cors());

morgan.token('body', function (req) { return  JSON.stringify(req.body)});
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];



console.log("hi");

app.get("/api/persons", (request, response) => {
  console.log("get persons");
  response.json(persons);
});

app.get("/info", (request, response) => {
  console.log("info");
  response.send(
    `<div>Phonebook has info for ${
      persons.length
    } persons <p>${new Date()}</p></div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log("get person id", id);
  const personFound = persons.find((person) => person.id === id);

  if (personFound) {
    response.json(personFound);
  } else {
    response
      .status(404)
      .json({ status: 404, errorMessage: "Person not found" });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const personFound = persons.find((person) => person.id === id);
  console.log("delete id", id);

  if (personFound) {
    persons = persons.filter((person) => person.id !== id);
    console.log("persons after delete", persons);
    response.status(200).end();
  } else {
    response.status(204).end();
  }
});

const getNewId = () => {
  for(;;) {
    const id = String(Math.floor(Math.random() *1000));
    if(!persons.find(person => person.id === id)) {
      return id;
    }
  }
}

app.post("/api/persons", (request, response) => {
  const body = request.body;

  console.log("add body", body);

  const name = body.name.toLowerCase();

  if(!body.name) {
    response.status(400).json({status: 400, errorMessage: `name is empty`});
    return;
  }

  if(!body.number) {
    response.status(400).json({status: 400, errorMessage: `number is empty`});
    return;
  }

  if(persons.find(person => person.name.toLowerCase() === name)) {
    response.status(400).json({status: 400, errorMessage: `Person with name ${body.name} already exists. Name must be unique`});
    return;
  }

  const newPerson = {
    ...body,
    id: getNewId(),
  }

  persons =[...persons, newPerson];
  response.json(newPerson);
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint !!' })
}

app.use(unknownEndpoint)

console.log(" process.env.PORT",  process.env.PORT)
const PORT = process.env.PORT || 3001
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
