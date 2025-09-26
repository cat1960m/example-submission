import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { ModalAddComment } from "./ModalAddComment";
import { useDispatch, useSelector } from "react-redux";
import {  addLike, removeBlog } from "../reducers/BlogReducer";

export const Blog = () => {
  const blogId = useParams().id;
  console.log("BlogId----", blogId);
  const blog = useSelector((state) => state.blog.blog);
  console.log("blog-----", blog);
  const isPending = useSelector((state) => state.blog.isPending);
  const loginUser = useSelector((state) => state.login.user);
  console.log("blog-----", blog, isPending, loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isPending) {
    return <div>{"...loading"}</div>;
  }

  if (!blog) {
    return null;
  }

  console.log("blog", blog);

  const handleLikeClick = () => {
    dispatch(addLike(blog));
  };

  const gotoBlogs = () => {
    navigate("/blogs");
  };

  const handleRemoveClick = () => {
    if (window.confirm("Do you want to delete blog ?")) {
      dispatch(removeBlog(blog.id, gotoBlogs));
    }
  };

  const { url, title, author, likes } = blog;

  const canDelete =
    loginUser && (loginUser?.userId ?? "0") === (blog.user?.id ?? "0");

  return (
    <div className="blog" data-testid="blogTestId">
      <h3>{`${title} ${author}`}</h3>
      <div>
        <a href={url}>{url}</a>
        <div id="likes">
          {`likes ${likes} `} <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{`added by ${blog.user?.name ?? "-"}`}</div>
        {canDelete && (
          <button
            onClick={handleRemoveClick}
            style={{ backgroundColor: "blue", color: "white" }}
          >
            remove
          </button>
        )}
      </div>
      <h4>Comments</h4>
      <ul>
        {blog.comments.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ModalAddComment />
    </div>
  );
};
