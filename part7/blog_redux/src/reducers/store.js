import { configureStore } from "@reduxjs/toolkit";

import NotificationReducer from "./NotificationReducer.js";

import BlogReducer from "./BlogReducer";

import LoginUserReducer from "./LoginUserReducer.js";

import userReducer from "./UserReducer.js";

export const store = configureStore({
  reducer: {
    notifications: NotificationReducer,
    blog: BlogReducer,
    login: LoginUserReducer,
    user: userReducer,
  },
});
