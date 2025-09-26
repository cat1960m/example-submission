const { test, describe } = require("node:test");
const assert = require("node:assert");
const helpers = require("../utils/list_helpers");
const { init_blogs } = require("./test_helpers");

test("test  dummy", () => {
  const result = helpers.dummy([]);

  assert.strictEqual(result, 1);
});

describe("likes count", () => {
  test("test  one item ", () => {
    const result = helpers.totalLikes([init_blogs[0]]);

    assert.strictEqual(result, init_blogs[0].likes);
  });

  test("test  all items ", () => {
    const result = helpers.totalLikes(init_blogs);

    assert.strictEqual(result, 36);
  });

  test();
});

describe("test favoriteBlog", () => {
  test("for  empty array", () => {
    const result = helpers.favoriteBlog([]);


    assert.deepStrictEqual(result, null);
  });

  test("for full array", () => {
    const result = helpers.favoriteBlog(init_blogs);


    assert.deepStrictEqual(result, init_blogs[2]);
  });
});

describe("test mostBlogs", () => {
  test("for  empty array", () => {
    const result = helpers.mostBlogs([]);


    assert.deepStrictEqual(result, null);
  });

  test("for full array", () => {
    const result = helpers.mostBlogs(init_blogs);


    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("test mostLikes", () => {
  test("for  empty array", () => {
    const result = helpers.mostLikes([]);


    assert.deepStrictEqual(result, null);
  });

  test("for full array", () => {
    const result = helpers.mostLikes(init_blogs);


    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
