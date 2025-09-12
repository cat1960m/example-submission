import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

test("createNewBlog method is executing with typed values", async () => {
  const handlerCreateNewBlog = vi.fn();
  const { container } = render(
    <CreateBlogForm createNewBlog={handlerCreateNewBlog} />
  );

  userEvent.setup();
  const title = screen.getByLabelText("title:");
  await userEvent.type(title, "ttt");

  const author = screen.getByPlaceholderText("author");
  await userEvent.type(author, "aaa");

  const url = container.querySelector("#url");
  await userEvent.type(url, "uuu");

  const button = screen.getByRole("button");
  await userEvent.click(button);

  expect(handlerCreateNewBlog.mock.calls[0][0]).toEqual({
    author: "aaa",
    title: "ttt",
    url: "uuu",
  });
});
