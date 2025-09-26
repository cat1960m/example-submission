import axios from "axios";
const baseURL = "/api";

const login = (props) => {
  return axios.post(`${baseURL}/login`, props);
};

export default login;
