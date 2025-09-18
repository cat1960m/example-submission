import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show: (state, action) => {
      console.log("action----", action.payload);
      return action.payload;
    },
  },
});

export const { show } = notificationSlice.actions;

export const showTime = (message, time) => (dispatch) => {
   dispatch(show(message));
   window.setTimeout(() => {
    dispatch(show(""))
   }, time* 1000)
}
export default notificationSlice.reducer;
