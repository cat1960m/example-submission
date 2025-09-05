const express = require("express");
const { MONGODB_URI } = require("./utils/config");
const mongoose = require("mongoose");
const { error, info } = require("./utils/logger");
const {
  requestLogger,
  undefinedRoute,
  errorHandler,
  userExtractor,
} = require("./utils/middleware");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

info("app");

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => info("connection to MongoDB"))
  .catch((errorMessage) => error(errorMessage));

const app = express();

app.use(express.static("dist"));
app.use(express.json());

//app.use(userExtractor);
app.use(requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);

app.use(undefinedRoute);
app.use(errorHandler);

module.exports = { app };
