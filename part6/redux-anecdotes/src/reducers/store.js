//import { createStore, combineReducers, con } from "redux";
import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import notificationReducer from "./notificationReducer";
import { configureStore } from "@reduxjs/toolkit";

/* const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const store = createStore(reducer); */

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
