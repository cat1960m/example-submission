import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const createAnecdote = async (anecdote) => {
    const result = await axios.post(baseUrl, anecdote);
    return result.data
}

const updateAnecdote = async (anecdote) => {
    const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return result.data
}


export default { getAll , createAnecdote, updateAnecdote};
