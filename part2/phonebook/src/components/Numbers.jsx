const Numbers = ({ persons, filterName, deletePerson }) => {
  const filterNameUpperCase = filterName.toUpperCase();
  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(filterNameUpperCase)
  );

  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {`${person.name} ${person.number}`}{" "}
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Numbers;
