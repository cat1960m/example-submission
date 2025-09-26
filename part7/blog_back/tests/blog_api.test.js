const { app } = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { test, after, beforeEach, describe, afterEach } = require("node:test");
const assert = require("node:assert");
const { Blog } = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const helper = require("./test_helpers");

const api = supertest(app);

/* beforeEach(async () => {
  await Blog.deleteMany({});

  const fullDB = async () => {
    const promises = [];
    helper.init_blogs.forEach((blog) => {
      const model = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      });

      promises.push(model.save());
    });
    await Promise.all(promises);
  };

  await fullDB();
}); */

describe("deleting of blog", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("EEE444_%%%777SdFg", 10);

    const user = new User({
      userName: "root",
      name: "user",
      passwordHash,
      blogs: [],
    });

    const userCreated = await user.save();

    await Blog.deleteMany({});

    const blog = new Blog({
      title: "title",
      author: "LL",
      url: "temp",
      likes: 4,
      user: userCreated._id,
    });

    await blog.save();

    const user1 = new User({
      userName: "second",
      name: "user",
      passwordHash,
      blogs: [],
    });

    await user1.save();
  });

  test("succeeds with status code 204 if id is valid and user is creator of blog", async () => {
    const blogsStart = await helper.blogsInDB();
    const id = blogsStart[0].id;
    const userId = blogsStart[0].user.toString();
    const user = await User.findById(userId);
    const userForJWTToken = {
      username: user.userName,
      id: user._id,
    };

    const token = jwt.sign(userForJWTToken, process.env.SECRET, {
      expiresIn: 60 * 160,
    });

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsEnd = await helper.blogsInDB();

    assert.strictEqual(blogsEnd.length + 1, blogsStart.length);
  });

  test("failed with status code 401 if user is not creator of blog", async () => {
    const blogsStart = await helper.blogsInDB();
    const id = blogsStart[0].id;
    const user = await User.findOne({ userName: "second" });
    const userForJWTToken = {
      username: user.userName,
      id: user._id,
    };

    const token = jwt.sign(userForJWTToken, process.env.SECRET, {
      expiresIn: 60 * 160,
    });

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    const blogsEnd = await helper.blogsInDB();

    assert.strictEqual(blogsEnd.length, blogsStart.length);
  });
});

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.init_blogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const result = await api.get("/api/blogs");

    assert.strictEqual(result.body.length, helper.init_blogs.length);
  });

  test(" unique identifier property of the blog posts is named id", async () => {
    const result = await api.get("/api/blogs");

    const id = result.body[0].id;

    assert.strictEqual(!!id, true);
  });

  describe("addition of a new blog", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("EEE444_%%%777SdFg", 10);

      const user = new User({
        userName: "root",
        name: "user",
        passwordHash,
        blogs: [],
      });

      await user.save();

      await Blog.deleteMany({});
    });

    test("successfully creates a new blog post", async () => {
      const blogsStart = await helper.blogsInDB();
      const { token, userId, userNameInDB } = await helper.getTokenUserId();

      const newBlog = {
        title: "new",
        author: "cat",
        url: "-",
        likes: 55,
      };

      const result = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201);

      const blogsResult = await helper.blogsInDB();

      assert.strictEqual(blogsStart.length, blogsResult.length - 1);

      const { user, id } = result.body;

      assert.strictEqual(userId, user);

      const userCurrent = await User.findOne({ userName: userNameInDB });
      assert.strictEqual(
        !!userCurrent.blogs.find((blog) => blog.toString() === id),
        true
      );
    });

    test(" if the likes property is missing from the request, it will default to the value 0", async () => {
      const { token } = await helper.getTokenUserId();
      const newBlog = {
        title: "new 99",
        author: "cat",
        url: "-",
      };

      const result = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201);

      assert.strictEqual(result.body.likes, 0);
    });

    test("if the title  properties is missing  the status code is 400", async () => {
      const { token } = await helper.getTokenUserId();

      const blogsStart = await helper.blogsInDB();
      const newBlog = {
        author: "cat",
        url: "temp",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsEnd = await helper.blogsInDB();

      assert.strictEqual(blogsStart.length, blogsEnd.length);
    });

    test("if the url  properties is missing  the status code is 400", async () => {
      const { token } = await helper.getTokenUserId();
      const blogsStart = await helper.blogsInDB();
      const newBlog = {
        author: "cat",
        title: "temp",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsEnd = await helper.blogsInDB();

      assert.strictEqual(blogsStart.length, blogsEnd.length);
    });
  });

  describe("updating of blog", () => {
    test("succeeds with status code 200 if data is valid", async () => {
      const blogsStart = await helper.blogsInDB();

      const blog = blogsStart[0];

      blog.title = "corrected title";

      const result = await api
        .put(`/api/blogs/${blog.id}`)
        .send(blog)
        .expect(200);

      assert.strictEqual(result.body.title, "corrected title");
    });

    test("not succeeds with status code 404 if id is not existing ", async () => {
      const blogsStart = await helper.blogsInDB();
      const id = await helper.notExistingId();

      const newBlog = {
        title: "cat",
        url: "temp",
      };

      await api.put(`/api/blogs/${id}`).send(newBlog).expect(404);

      const blogsEnd = await helper.blogsInDB();

      assert.strictEqual(blogsStart.length, blogsEnd.length);
    });

    test("not succeeds with status code 400 if data is not valid ", async () => {
      const blogsStart = await helper.blogsInDB();
      const id = blogsStart[0].id;

      const newBlog = {
        title: "cat",
      };

      await api.put(`/api/blogs/${id}`).send(newBlog).expect(400);

      const blogsEnd = await helper.blogsInDB();

      assert.strictEqual(blogsStart.length, blogsEnd.length);
    });
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogs = await helper.blogsInDB();
      const id = blogs[0].id;
      const path = `/api/blogs/${id}`;

      const result = await api
        .get(path)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(result.body.title, blogs[0].title);
      assert.strictEqual(!!result.body.comments, true);
    });

    test("not succeeds if id does not exist", async () => {
      const id = await helper.notExistingId();
      const blogsStart = await helper.blogsInDB();

      const result = await api.get(`/api/blogs/${id}`).expect(404);
      const blogsCurrent = await helper.blogsInDB();

      assert.strictEqual(blogsStart.length, blogsCurrent.length);
    });
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("EEE444_%%%777SdFg", 10);

    const user = new User({
      userName: "root",
      name: "user",
      passwordHash,
      blogs: [],
    });

    await user.save();
  });

  test("all users from  db return one user", async () => {
    const result = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.length, 1);
  });

  describe("addition of a new user", () => {
    test("creation succeeds with a fresh username of required length", async () => {
      const user = {
        name: "KD",
        userName: "dog",
        password: "EEE444_%%%777SdFg",
      };

      const usersStart = await helper.usersInDB();

      const result = await api
        .post("/api/users")
        .send(user)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersCurrent = await helper.usersInDB();

      assert.strictEqual(usersStart.length + 1, usersCurrent.length);

      const userNames = usersCurrent.map((user) => user.userName);

      assert.strictEqual(userNames.includes("dog"), true);
    });

    test("creation failed with a existing username", async () => {
      const user = {
        name: "KD",
        userName: "root",
        password: "EEE444_%%%777SdFg",
      };

      const usersStart = await helper.usersInDB();

      const result = await api.post("/api/users").send(user).expect(400);

      assert(result.body.error.includes("expected `username` to be unique"));

      const usersCurrent = await helper.usersInDB();

      assert.strictEqual(usersStart.length, usersCurrent.length);
    });

    test("creation failed with  username is too short", async () => {
      const usersStart = await helper.usersInDB();
      const user = {
        userName: "OO",
        password: "EEE444_%%%777SdFg",
        name: "-",
      };

      const result = await api.post("/api/users").send(user).expect(400);

      const usersCurrent = await helper.usersInDB();

      assert.strictEqual(usersStart.length, usersCurrent.length);
    });

    test("creation failed with  username contains forbidden symbols", async () => {
      const usersStart = await helper.usersInDB();
      const user = {
        userName: "@%%%%%%%%%%%",
        password: "EEE444_%%%777SdFg",
        name: "-",
      };

      const result = await api.post("/api/users").send(user).expect(400);

      const usersCurrent = await helper.usersInDB();

      assert.strictEqual(usersStart.length, usersCurrent.length);
    });

    test("creation failed with password is too short ", async () => {
      const usersStart = await helper.usersInDB();
      const user = {
        userName: "newuser1",
        password: "L9",
        name: "-",
      };

      const result = await api.post("/api/users").send(user).expect(400);

      assert.strictEqual(result.body.error, "password is too short");

      const usersCurrent = await helper.usersInDB();

      assert.strictEqual(usersStart.length, usersCurrent.length);
    });

    test("creation failed with password is not strong ", async () => {
      const usersStart = await helper.usersInDB();
      const user = {
        userName: "newuser1",
        password: "9999",
        name: "-",
      };

      const result = await api.post("/api/users").send(user).expect(400);

      assert.strictEqual(result.body.error, "password is not strong");

      const usersCurrent = await helper.usersInDB();

      assert.strictEqual(usersStart.length, usersCurrent.length);
    });
  });
});

after(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await mongoose.connection.close();
});
