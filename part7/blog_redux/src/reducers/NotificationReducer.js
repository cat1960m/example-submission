import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  isError: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return {
        text: action.payload,
        isError: false,
      };
    },
    setError: (state, action) => {
      return {
        text: action.payload,
        isError: true,
      };
    },
  },
});

export const { setError } = notificationSlice.actions;
const { setMessage } = notificationSlice.actions;

export const setNotification = (content) => (dispatch) => {
  dispatch(setMessage(content));
  setTimeout(() => {
    dispatch(setMessage(""));
  }, 3000);
};
export default notificationSlice.reducer;
