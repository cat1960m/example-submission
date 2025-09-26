import { createSlice } from "@reduxjs/toolkit";
import login from "../services/login";
import { setNotification } from "./NotificationReducer";

const initialState = {
  user: null,
  error: "",
  isPending: false,
};

const loginUserSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      state.user = action.payload;
    },
    setIsPending: (state, action) => {
      state.isPending = action.payload;
    },
    setErrors: (state, action) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      window.localStorage.removeItem("token");
    },
  },
});

const { setLoginUser, setIsPending, setErrors } = loginUserSlice.actions;
export const { logoutUser } = loginUserSlice.actions;

export const makeLoginUser = (userData) => async (dispatch) => {
  dispatch(setIsPending(true));
  dispatch(setErrors(""));
  try {
    console.log("userData", userData);
    const result = await login(userData);
    console.log("login result", result);
    const { token, ...user } = result.data;
    dispatch(setLoginUser(user));
    window.localStorage.setItem("token", token);
    dispatch(setIsPending(false));
    dispatch(setNotification("user is logged in"))
  } catch (error) {
    console.log("login error");
    dispatch(setErrors(error.toString()));
    dispatch(setIsPending(false));
  }
};

export default loginUserSlice.reducer;
