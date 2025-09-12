import axios from "axios";
const baseURL = "/api";

const getBlogs = () => {
  return axios.get(`${baseURL}/blogs`);
};

const createBlog = (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${baseURL}/blogs`, blog, config);
};

const updateBlog = (blog) => {
  const data = {
    author: blog.author,
    url: blog.url,
    title: blog.title,
    likes: blog.likes,
  };
  return axios.put(`${baseURL}/blogs/${blog.id}`, data);
};

const removeBlog = (blogId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.delete(`${baseURL}/blogs/${blogId}`, config);
};

export default { getBlogs, createBlog, updateBlog, removeBlog };
