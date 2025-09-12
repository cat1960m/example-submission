const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { userName, password } = request.body;
  console.log("!!!!!!");
  const user = await User.findOne({ userName });
  const isPasswordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!(user && isPasswordCorrect)) {
    response.status(401).json({ error: "invalid username or password" });
  }

  const userForJWTToken = {
    username: userName,
    id: user._id,
  };

  const token = jwt.sign(userForJWTToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  console.log("---------user", user);

  response
    .status(200)
    .send({ userName, name: user.name, token, userId: user._id.toString() });
});

module.exports = loginRouter;
