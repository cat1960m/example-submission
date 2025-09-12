const testingRouter = require("express").Router();
const { Blog } = require("../models/blog");
const User = require("../models/user");

testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});

testingRouter.post("/blog", async (request, response) => {
  const bb = request.body;
  const user = await User.findOne({});

  console.log("user", user._id);

  const blog = new Blog({
    author: bb.author,
    title: bb.title,
    likes: bb.likes,
    url: bb.url,
    user: user._id,
  });
  const newBlog = await blog.save();

  user.blogs = [...user.blogs, newBlog._id];

  const u = await user.save();

  console.log("save", u.blogs);
  response.status(200).end();
});

module.exports = testingRouter;
