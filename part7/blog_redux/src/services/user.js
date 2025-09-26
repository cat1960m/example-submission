import axios from "axios";
const baseUrl = "/api";

const getUsers = () => {
  return axios.get(`${baseUrl}/users`);
};

const getUser = (id) => {
  return axios.get(`${baseUrl}/users/${id}`);
};

export default { getUsers, getUser };
