import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "title blog",
  author: "author blog",
  url: "url temp",
  likes: "2",
};

test(" blog title is rendering, but author , likes and url not", () => {
  render(<Blog blog={blog} />);

  const title = screen.getByText("title blog");
  expect(title).toBeVisible();

  const author = screen.queryByText("author blog");
  expect(author).toBeNull();

  const url = screen.queryByText("-");
  expect(url).toBeNull();

  const likes = screen.queryByText("likes");
  expect(likes).toBeNull();
});

test("author , likes and url are rendering after click of button 'show'", async () => {
  const { container } = render(<Blog blog={blog} />);
  userEvent.setup();
  const show = screen.getByText("show");

  await userEvent.click(show);

  const author = await screen.findByText("author", { exact: false });

  expect(author).toBeVisible();

  const url = screen.getByText("url", { exact: false });
  expect(url).toBeVisible();

  const likes = container.querySelector("#likes");
  expect(likes).toBeVisible();

  const div = screen.getByTestId("blogTestId");
  expect(div).toHaveTextContent("likes 2");
});

test("'addLikes' method executed twice when 'like' button clicked twice", async() => {
  const handlerAddLike = vi.fn();
  render(<Blog blog={blog} addLike={handlerAddLike} />);
  userEvent.setup();

  const show = screen.getByText("show");
  await userEvent.click(show);
  const like = screen.getByText("like");
  await userEvent.click(like);
  await userEvent.click(like);
  expect(handlerAddLike.mock.calls.length).toBe(2)
});

