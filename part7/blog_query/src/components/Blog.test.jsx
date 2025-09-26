import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";

const blog = {
  title: "title blog",
  author: "author blog",
  url: "url temp",
  likes: "2",
};

vi.mock("../hooks/useBlogQuery", () => ({
  useBlogQuery: vi.fn().mockReturnValue({
    blog: {
      title: "title blog",
      author: "author blog",
      url: "url temp",
      likes: 2,
      comments: [],
      user: {
        name: "KKK",
        id: "LL",
      },
    },
    isPending: false,
  }),
}));

vi.mock("../hooks/useRemoveBlog", () => ({
  useRemoveBlog: vi.fn().mockReturnValue({
    removeBlog: () => {},
  }),
}));

vi.mock("./ModalAddComment", () => ({
  ModalAddComment: vi.fn().mockReturnValue(() => null),
}));

vi.mock("../hooks/useUser", () => ({
  useUser: vi.fn().mockReturnValue({
    user: null,
  }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: "123" }), // 👈 mocked value
    useNavigate: () => {},
  };
});

const { addLikeFn } = vi.hoisted(() => ({
  addLikeFn: vi.fn(),
}));

vi.mock("../hooks/useAddLike", () => ({
  useAddLike: vi.fn().mockReturnValue({
    addLike: addLikeFn,
  }),
}));

describe("<Blog>", () => {
  beforeEach(() => {
    addLikeFn.mockClear();
  });

  test(" blog title is rendering, but author , likes and url not", () => {
    render(<Blog />);

    const title = screen.getByText("title blog", { exact: false });
    expect(title).toBeVisible();

    const author = screen.queryByText("author blog", { exact: false });
    expect(author).toBeVisible();

    const url = screen.queryByText("url temp");
    expect(url).toBeVisible();

    const likes = screen.queryByText("likes", { exact: false });
    expect(likes).toBeVisible();
  });

  test("fun is executed after click 'like'", async () => {
    const { container } = render(<Blog blog={blog} />);
    userEvent.setup();
    const show = screen.getByText("like");

    await userEvent.click(show);

    const likes = container.querySelector("#likes");
    expect(likes).toBeVisible();

    //const div = screen.getByTestId("blogTestId");
    //expect(div).toHaveTextContent("likes 2");
    expect(addLikeFn).toBeCalledTimes(1);
  });

  test("fun executed twice when 'like' button clicked twice", async () => {
    render(<Blog />);
    userEvent.setup();

    const like = screen.getByText("like");
    await userEvent.click(like);
    await userEvent.click(like);
    expect(addLikeFn.mock.calls.length).toBe(2);
  });
});
