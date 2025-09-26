import { createSlice } from "@reduxjs/toolkit";
import services from "../services/blog";
import { setError, setNotification } from "./NotificationReducer";

const initialState = {
  blogs: [],
  blog: null,
  error: "",
  isPending: false,
};

const blogsSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlogs: (state, action) => {
      state.blogs = action.payload;
    },

    appendBlog: (state, action) => {
      state.blogs = [...state.blogs, action.payload];
    },

    updateBlogLikes: (state, action) => {
      const index = state.blogs.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.blogs[index].likes = action.payload.likes;
      }

      state.blog.likes = action.payload.likes;
    },

    setBlog: (state, action) => {
      state.blog = action.payload;
    },

    setIsPending: (state, action) => {
      state.isPending = action.payload;
    },
    setErrors: (state, action) => {
      state.error = action.payload;
    },

    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    },

    addComment: (state, action) => {
      state.blog.comments.push(action.payload);
    },
  },
});

export const {
  addBlogs,
  appendBlog,
  updateBlogLikes,
  setBlog,
  deleteBlog,
  setIsPending,
  setErrors,
  addComment,
} = blogsSlice.actions;

const errorWork = (error, dispatch) => {
  dispatch(setIsPending(false));
  dispatch(setErrors(error.toString()));
  dispatch(setError(error.response?.data?.error ?? error.toString()));
};

const initRequest = (dispatch) => {
  dispatch(setIsPending(true));
  dispatch(setErrors(""));
};

export const getBlogs = () => async (dispatch) => {
  initRequest(dispatch);
  try {
    const result = await services.getBlogs();
    console.log("get blogs", result);
    dispatch(addBlogs(result.data));
    dispatch(setIsPending(false));
  } catch (error) {
    errorWork(error, dispatch);
  }
};

export const getBlogComments = (id) => async (dispatch) => {
  initRequest(dispatch);
  try {
    const result = await services.getBlogComments(id);
    console.log("getBlog", result.data);
    dispatch(setBlog(result.data));
    dispatch(setIsPending(false));
  } catch (error) {
    errorWork(error, dispatch);
  }
};

export const createBlog = (blog, clear) => async (dispatch) => {
  initRequest(dispatch);
  try {
    const token = window.localStorage.getItem("token");
    const result = await services.createBlog(blog, token);
    console.log("new blog", result.data);
    const newBlog = result.data;
    dispatch(appendBlog(newBlog));
    dispatch(setIsPending(false));
    dispatch(setNotification(`blog "${result.data.title}" is created`));
    clear();
  } catch (error) {
    errorWork(error, dispatch);
  }
};

export const addLike = (blog) => async (dispatch) => {
  initRequest(dispatch);
  try {
    const result = await services.updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
    console.log("------------addLike result", result);
    dispatch(updateBlogLikes(result.data));
    dispatch(setNotification(`blog "${result.data.title}" is liked`));
    dispatch(setIsPending(false));
  } catch (error) {
    errorWork(error, dispatch);
  }
};

export const removeBlog = (blogId, gotoBlogs) => async (dispatch) => {
  initRequest(dispatch);
  try {
    const token = window.localStorage.getItem("token");
    await services.removeBlog(blogId, token);
    dispatch(deleteBlog(blogId));
    dispatch(setNotification("blog is deleted"));
    dispatch(setIsPending(false));
    gotoBlogs();
  } catch (error) {
    errorWork(error, dispatch);
  }
};

export const AddBlogComment = (blogId, content) => async (dispatch) => {
  initRequest(dispatch);
  try {
    await services.addComment(content, blogId);
    dispatch(addComment(content));
    dispatch(setNotification("comment is added"));
    dispatch(setIsPending(false));
  } catch (error) {
    errorWork(error, dispatch);
  }
};

export default blogsSlice.reducer;
