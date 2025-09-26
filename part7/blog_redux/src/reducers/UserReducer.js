import { createSlice } from "@reduxjs/toolkit";
import services from "../services/user";

const initialState = {
  users: [],
  user: null,
  error: "",
  isPending: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsPending: (state, action) => {
      state.isError = action.payload;
    },
  },
});

const { setUser, setUsers, setError, setIsPending } = userSlice.actions;

export const getUsers = () => async (dispatch) => {
  dispatch(setIsPending(true));
  dispatch(setError(""));
  try {
    const result = await services.getUsers();
    dispatch(setUsers(result.data));
    dispatch(setIsPending(false));
  } catch (error) {
    dispatch(setError(error.respons?.data?.error ?? error.toString()));
    dispatch(setIsPending(false));
  }
};

export const getUser = (id) => async (dispatch) => {
  dispatch(setIsPending(true));
  dispatch(setError(""));
  try {
    console.log("user get id", id)
    const result = await services.getUser(id);
    dispatch(setUser(result.data));
    dispatch(setIsPending(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.error ?? error.toString()));
    dispatch(setIsPending(false));
  }
};

export default userSlice.reducer;
