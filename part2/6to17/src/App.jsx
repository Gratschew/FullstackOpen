import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Notification = ({ message }) => {
  if (message === null || message.message == null || message.type == null) {
    return null;
  }
  if (message.type == "error") {
    return (
      <div
        style={{
          color: "red",
          background: "lightgrey",
          fontSize: "20px",
          borderStyle: "solid",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {message.message}
      </div>
    );
  }
  if (message.type == "success") {
    return (
      <div
        style={{
          color: "green",
          background: "lightgrey",
          fontSize: "20px",
          borderStyle: "solid",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {message.message}
      </div>
    );
  }
};

const NewPersonForm = ({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const NumbersList = ({ persons, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button
              onClick={() => {
                deletePerson(person.id, person.name);
              }}
            >
              delete
            </button>
          </p>
        ))}
      </ul>
    </>
  );
};

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      Filter shown with <input onChange={handleFilterChange} />
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState({ message: null, type: null });

  useEffect(() => {
    fetchPersons();
  }, []);

  useEffect(() => {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredPersons(filtered);
  }, [filter, persons]);

  const fetchPersons = async () => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      console.log(existingPerson);
      var userInput = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (userInput) {
        const newPersonObject = { name: newName, number: newNumber };
        personService
          .modifyById(existingPerson.id, newPersonObject)
          .then((data) => {
            // update the new number to the state
            const updatedPersons = persons.map((person) => {
              if (person.id === existingPerson.id) {
                return data;
              }
              return person;
            });

            setPersons(updatedPersons);
            setNewName("");
            setNewNumber("");
            setMessage({
              message: `Updated number of ${newName}`,
              type: "success",
            });
            setTimeout(() => {
              setMessage({ message: null, type: null });
            }, 3000);
          });
      }

      return;
    }
    const newPersonObject = { name: newName, number: newNumber };
    personService.create(newPersonObject).then((data) => {
      setPersons([...persons, data]);
      setNewName("");
      setNewNumber("");
      setMessage({ message: `Added ${newName}`, type: "success" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 3000);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const hanndleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  };

  const deletePerson = (id, name) => {
    var userInput = window.confirm(`Delete ${name}?`);
    if (userInput) {
      personService
        .deleteById(id)
        .then((result) => {
          const filtered = persons.filter((person) => {
            return person.id != id;
          });
          setPersons(filtered);
          setMessage({ message: `Deleted ${name}`, type: "success" });
          setTimeout(() => {
            setMessage({ message: null, type: null });
          }, 3000);
        })
        .catch((error) => {
          setMessage({
            message: `Information of ${name} has already been deleted from the server`,
            type: "error",
          });
          setTimeout(() => {
            setMessage({ message: null, type: null });
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={hanndleFilterChange} />

      <h3>Add a new</h3>
      <NewPersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      ></NewPersonForm>
      <NumbersList
        persons={filteredPersons}
        deletePerson={deletePerson}
      ></NumbersList>
    </div>
  );
};

export default App;
