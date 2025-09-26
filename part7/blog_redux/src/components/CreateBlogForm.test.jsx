import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";
import { configureStore } from "@reduxjs/toolkit";
import BlogReducer from "../reducers/BlogReducer";
import LoginUserReducer from "../reducers/LoginUserReducer";
import { Provider } from "react-redux";
import * as services from "../services/blog";

const blog = {
  title: "title blog",
  author: "author blog",
  url: "url temp",
  likes: 2,
  comments: [],
  id: "123",
};
let store = {};

const preloadedState = {
  blog: {
    blog,
    blogs: [],
    isPending: false,
    user: null,
  },
  login: {
    user: null,
    error: "",
    isPending: false,
  },
};

vi.mock(import("../services/blog"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      ...(actual.default || {}),
      createBlog: vi.fn(),
    },
  };
});

store = configureStore({
  reducer: {
    blog: BlogReducer,
    login: LoginUserReducer,
  },
  preloadedState,
});

test("createNewBlog method is executing with typed values", async () => {
  const { container } = render(
    <Provider store={store}>
      <CreateBlogForm />
    </Provider>
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

  expect(services.default.createBlog.mock.calls[0][0]).toEqual({
    author: "aaa",
    title: "ttt",
    url: "uuu",
  });
});
