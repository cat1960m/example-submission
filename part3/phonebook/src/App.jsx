import { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import phones from "./services/phones";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    phones.getAll().then((data) => {
      console.log("data", data);
      setPersons(data);
    });
  }, []);

  const handleNameChange = (event) => {
    const name = event.target.value;
    console.log("name", name);
    setNewName(name);
  };

  const handleNumberChange = (event) => {
    const number = event.target.value;
    console.log("number", number);
    setNewNumber(number);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("newName", newName);
    const newNameUpperCase = newName.toUpperCase();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const foundPerson = persons.find(
      (person) => person.name.toLocaleUpperCase() === newNameUpperCase
    );

    if (!foundPerson) {
      phones.addPerson(newPerson).then((data) => {
        setPersons([...persons, data]);
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${data.name}`);
        window.setTimeout(() => {
          setNotification("");
        }, 5000);
      });
      return;
    }

    if (
      !window.confirm(
        `${foundPerson.name} is already in phone book.Do you wand to replace old number with new one?`
      )
    ) {
      return;
    }

    phones
      .changePerson(newPerson, foundPerson.id)
      .then((data) => {
        const newPersons = persons.map((person) =>
          person.id === foundPerson.id ? data : person
        );
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
      })
      .catch(() => {
        setErrorMessage(`The person ${newPerson.name} is already deleted`);
        window.setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  };

  const deletePerson = (personToDelete) => {
    if (!window.confirm("Do you want to delete this person ?")) {
      return;
    }

    phones
      .deletePerson(personToDelete.id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      })
      .catch(() => {
        setErrorMessage(
          `This person ${personToDelete.name} is already deleted`
        );
        window.setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  };

  return (
    <div>
      <h2>My Phonebook</h2>
      {notification && <div className="notification">{notification}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Numbers
        persons={persons}
        filterName={filterName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
