import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";
import { configureStore } from "@reduxjs/toolkit";
import BlogReducer from "../reducers/BlogReducer";
import LoginUserReducer from "../reducers/LoginUserReducer";
import * as services from "../services/blog";

import { Provider } from "react-redux";

const blog = {
  title: "title blog",
  author: "author blog",
  url: "url temp",
  likes: 2,
  comments: [],
  id: "123",
};

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: "123" }), // 👈 mocked value
    useNavigate: () => {},
  };
});

let store = {};

describe("<Blog>", () => {
  beforeEach(() => {
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

    store = configureStore({
      reducer: {
        blog: BlogReducer,
        login: LoginUserReducer,
      },
      preloadedState,
    });
  });
  test(" blog items are rendering", async () => {
    render(
      <Provider store={store}>
        <Blog />
      </Provider>
    );

    const title = screen.getByText("title blog", { exact: false });
    expect(title).toBeVisible();

    const author = screen.queryByText("author blog", { exact: false });
    expect(author).toBeVisible();

    const url = screen.queryByText("url temp");
    expect(url).toBeVisible();

    const likes = screen.queryByText("likes", { exact: false });
    expect(likes).toBeVisible();
  });

  test(" field 'likes' is changed after click on 'like'", async () => {
    vi.mock(import("../services/blog"), async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        default: {
          ...(actual.default || {}),
          updateBlog: vi.fn().mockReturnValue({
            data: {
              title: "title blog",
              author: "author blog",
              url: "url temp",
              likes: 3,
              comments: [],
              id: "123",
            },
          }),
        },
      };
    });

    const { container } = render(
      <Provider store={store}>
        <Blog />
      </Provider>
    );
    userEvent.setup();
    const like = screen.getByText("like");

    await userEvent.click(like);

    expect(services.default.updateBlog).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      //  const state = store.getState();
      //  expect(state).toEqual({});
      const div = screen.getByTestId("blogTestId");
      expect(div).toHaveTextContent("likes 3");
    });
  });

  test("'updateBlog' method executed twice when 'like' button clicked twice", async () => {
    render(
      <Provider store={store}>
        <Blog />
      </Provider>
    );
    userEvent.setup();

    const like = screen.getByText("like");
    await userEvent.click(like);
    expect(services.default.updateBlog.mock.calls[0][0].likes).toBe(3);
    await userEvent.click(like);
    expect(services.default.updateBlog.mock.calls.length).toBe(2);
    expect(services.default.updateBlog.mock.calls[1][0].likes).toBe(3);
  });
});
