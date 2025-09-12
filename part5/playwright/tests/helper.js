const { test, expect, beforeEach, describe } = require("@playwright/test");

const loginWith = async (page, username, password) => {
  const button = page.getByRole("button", {
    name: "log in to application",
  });
  await button.click();
  const input1 = await page.getByLabel("username");
  await input1.fill(username);
  const input2 = await page.getByLabel("password");
  await input2.fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title) => {
  const button1 = page.getByRole("button", { name: "create new blog" });
  await button1.click();
  const inputTitle = await page.getByLabel("title");
  await inputTitle.fill(title);
  const inputAuthor = await page.getByLabel("author");
  await inputAuthor.fill("A1");
  const inputUrl = await page.getByLabel("url");
  await inputUrl.fill("-");
  const buttonCreate = await page.getByRole("button", { name: "create" });
  await buttonCreate.click();
  await page.getByText(title).waitFor();
};

const addLikes = async (page, title, likes) => {
  const textTitle = await page.getByText(title);
  const parent = await textTitle.locator("..");
  const show = await parent.getByRole("button", { name: "show" });
  await show.click();

  const parentParent = parent.locator("..");

  for (let i = 0; i < likes; i++) {
    const buttonLike = await parentParent.getByRole("button", { name: "like" });
    await buttonLike.click();
    await parentParent.getByText(`likes ${i + 1}`).waitFor();
  }

  const count = await parentParent.getByText(`likes ${likes}`);

  //console.log("----", title, await count.textContent());

  await expect(count).toBeVisible();
};

export { loginWith, createBlog, addLikes };
