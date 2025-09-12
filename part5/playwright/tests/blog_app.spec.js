const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, addLikes } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        userName: "root",
        password: "uuuu_888G%%%%",
        name: "cat",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByRole("button", { name: "log in to application" });
    await expect(locator).toBeVisible();
    await locator.click();

    const userName = page.getByRole("textbox", { name: "username" });
    await expect(userName).toBeVisible();

    const password = page.getByLabel("password");
    await expect(password).toBeVisible();

    const login = page.getByText("login");
    await expect(login).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "root", "uuuu_888G%%%%");

      const text = page.getByText("cat is logged in");
      await expect(text).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "root5", "uuuu_888G%%%%");

      const error = page.locator(".error");
      await expect(error).toBeVisible();
      await expect(error).toHaveCSS("color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "uuuu_888G%%%%");
      await createBlog(page, "Title1");
    });

    test("a new blog can be created", async ({ page }) => {
      const textTitle = page.getByText("Title1");
      await expect(textTitle).toBeVisible();
      const message = page.locator(".message");
      await expect(message).toHaveText("blog created");
    });

    test("blog can be liked", async ({ page }) => {
      const textTitle = page.getByText("Title1");
      const parent = textTitle.locator("..");
      const show = parent.getByRole("button", { name: "show" });
      await show.click();

      const parentParent = parent.locator("..");

      const like = parentParent.getByRole("button", { name: "like" });
      await like.click();

      const likesText = parentParent.getByText("likes 1");
      await expect(likesText).toBeVisible();
    });

    test("the user who created the blog can delete it", async ({ page }) => {
      const textTitle = page.getByText("Title1");
      const parent = textTitle.locator("..");
      const show = parent.getByRole("button", { name: "show" });
      await show.click();

      const parentParent = parent.locator("..");

      const remove = parentParent.getByRole("button", { name: "remove" });
      await expect(remove).toBeVisible();

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        // expect(dialog.message()).toBe("Are you sure?");
        await dialog.accept();
        console.log("accept");
      });

      await remove.click();

      const textTitle1 = page.getByText("Title1");
      await expect(textTitle1).not.toBeVisible();
    });

    test("a user who has not created a blog cannot delete it", async ({
      page,
      request,
    }) => {
      await request.post("/api/users", {
        data: {
          userName: "second",
          password: "uuuu_888G%%%%",
          name: "dog",
        },
      });
      const logout = page.getByText("logout");
      await logout.click();

      await loginWith(page, "second", "uuuu_888G%%%%");

      const textTitle = page.getByText("Title1");
      const parent = textTitle.locator("..");
      const show = parent.getByRole("button", { name: "show" });
      await show.click();

      const parentParent = parent.locator("..");

      const remove = parentParent.getByRole("button", { name: "remove" });
      await expect(remove).not.toBeVisible();
    });
  });

  describe("when some blogs are created", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "uuuu_888G%%%%");
      await createBlog(page, "Title1");
      await createBlog(page, "Title2");
      await createBlog(page, "Title3");
    });

    test("blogs are sorted according to the likes (variant 1)", async ({
      page,
    }) => {
      await addLikes(page, "Title2", 2);
      await addLikes(page, "Title3", 1);

      const blogs = await page.locator(".blog").all();

      await expect(blogs.length).toBe(3);

      await expect(blogs[0].getByText("Title2")).toBeVisible();
      await expect(blogs[1].getByText("Title3")).toBeVisible();
      await expect(blogs[2].getByText("Title1")).toBeVisible();
    });
  });
});

test("blogs are sorted according to the likes (variant 2)", async ({
  page,
  request,
}) => {
  await request.post("/api/testing/reset");
  await request.post("/api/users", {
    data: {
      userName: "root",
      password: "uuuu_888G%%%%",
      name: "cat",
    },
  });

  await request.post("/api/testing/blog", {
    data: {
      title: "Title2",
      likes: 36,
      author: "rrrr",
      url: "temp",
    },
  });

  await request.post("/api/testing/blog", {
    data: {
      title: "Title1",
      likes: 3,
      author: "rrrr",
      url: "temp",
    },
  });

  await request.post("/api/testing/blog", {
    data: {
      title: "Title3",
      likes: 30,
      author: "rrrr",
      url: "temp",
    },
  });

  await page.goto("/");

  await expect(page.getByText("blogs")).toBeVisible();

  await page.getByText("Title3").waitFor();

  const shows = await page.getByText("show").all();

  await expect(shows.length).toBe(3);

  const blogs = await page.locator(".blog").all();

  await expect(blogs.length).toBe(3);

  await expect(blogs[0].getByText("Title2")).toBeVisible();
  await expect(blogs[1].getByText("Title3")).toBeVisible();
  await expect(blogs[2].getByText("Title1")).toBeVisible();
});
