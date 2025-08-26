import axios from "axios";

//const basePath = "http://localhost:3001/persons";

//const basePath = "https://example-submission.onrender.com/api/persons";

const basePath = "/api/persons";

const getAll = () =>
  axios.get(basePath).then((response) => {
    console.log("data", response.data);
    return response.data;
  });

const addPerson = (person) =>
  axios.post(basePath, person).then((response) => response.data);

const deletePerson = (personId) => axios.delete(`${basePath}/${personId}`);

const changePerson = (person, personId) =>
  axios
    .put(`${basePath}/${personId}`, person)
    .then((response) => response.data);

export default {
  getAll,
  addPerson,
  deletePerson,
  changePerson,
};
