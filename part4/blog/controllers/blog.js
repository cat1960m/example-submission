const blogRouter = require("express").Router();
const { Blog } = require("../models/blog");
const User = require("../models/user");
const { info } = require("../utils/logger");

blogRouter.get("/", async (request, response, next) => {
  const result = await Blog.find({}).populate("user", {
    userName: 1,
    name: 1,
    id: 1,
  });
  response.json(result);
});

blogRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  info("get Id blog", blog);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", async (request, response, next) => {
  info("blogRouter.post", request.body);
  const body = request.body;

  if (!body) {
    response.status(404).json({ error: "No body" });
  }

  const { author, title, url, likes } = body;

  const userId = request.userId;

  const user = await User.findById(userId);

  if (!user) {
    response.status(404).json({ error: `UserId missing or not valid` });
    return;
  }

  const blog = new Blog({
    author,
    title,
    url,
    likes: likes ?? 0,
    user: user._id,
  });

  const newBlog = await blog.save();

  user.blogs = [...user.blogs, newBlog._id];
  await user.save();

  info("=====new blog", newBlog);
  response.status(201).json(newBlog);
});

blogRouter.delete("/:id", async (request, response, next) => {
  const requestUserId = request.userId;

  if (!requestUserId) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== requestUserId.toString()) {
    return response.status(401).json({ error: "Only creator can delete blog" });
  }

  const result = await blog.deleteOne({});

  if (!result) {
    return response.status(204).send("already deleted");
  }

  const userId = result.user?.toString();

  if (userId) {
    const user = await User.findById(userId);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== result._id.toString()
    );
    await user.save();
  }
  response.status(204).end();
});

blogRouter.put("/:id", (request, response, next) => {
  const { author, title, likes, url } = request.body;

  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        response.status(404).end();
      }

      blog.author = author;
      blog.title = title;
      blog.likes = likes;
      blog.url = url;

      const errorValidation = blog.validateSync();
      if (!!errorValidation) {
        info("======isvalid", errorValidation.toString());
        response
          .status(400)
          .json({ error: "Body incorrect: " + errorValidation.toString() });
        return;
      }

      blog
        .save()
        .then((blog) => {
          info("corrected blog", blog);
          response.json(blog);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

blogRouter.post("/:id/comment", async (request, response) => {
  const blogId = request.params.id;
  const body = request.body;

  const newComment = new Comment({
    content: body.content,
    blogId: blogId,
  });

  const newContent = await newComment.save();

  response.status(204).json(newContent);
});

module.exports = blogRouter;
