import axios from "axios";
const baseURL = "/api";

const getUsers = () => {
    console.log ("getUsers");
    return axios.get(`${baseURL}/users`);
}
const getUser = (id) => {
    return axios.get(`${baseURL}/users/${id}`);
}

export default { getUsers, getUser };
