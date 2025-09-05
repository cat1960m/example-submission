const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

userRouter.post("/", async (request, response) => {
  const { userName, password, name } = request.body;

  if(password.length <3) {
    response.status(400).json({error: "password is too short"})
  }

  if(!isStrongPassword(password)) {
    response.status(400).json({error: "password is not strong"})
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    userName,
    name,
    passwordHash,
    blogs: [],
  });


  const userCreated = await user.save();

  response.status(201).json(userCreated);
});

userRouter.get("/", async (request, response) => {
  const result = await User.find({}).populate("blogs", {title: 1, author:1});
  response.json(result);
});

module.exports = userRouter;
