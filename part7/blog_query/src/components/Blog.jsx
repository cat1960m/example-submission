import "../App.css";
import { useRemoveBlog } from "../hooks/useREmoveBlog";
import { useAddLike } from "../hooks/useAddLike";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Button } from "@mui/material";
import { ModalAddComment } from "./ModalAddComment";
import { useBlogQuery } from "../hooks/useBlogQuery";

export const Blog = () => {
  const blogId = useParams().id;
  console.log("BlogId----", blogId);

  const { blog, isPending } = useBlogQuery(blogId);

  // const blog = blogs.find((item) => item.id === blogId);
  const { removeBlog } = useRemoveBlog();
  const { addLike } = useAddLike();
  const { user } = useUser();

  if (isPending) {
    return <div>{"...loading"}</div>;
  }

  if (!blog) {
    return null;
  }

  console.log("blog", blog);

  const handleLikeClick = () => {
    addLike(blog);
  };

  const handleRemoveClick = () => {
    if (window.confirm("Do you want to delete blog ?")) {
      removeBlog(blog.id);
    }
  };

  const { url, title, author, likes } = blog;

  const canDelete =
    user &&
    (user?.userId.toString() ?? "0") === (blog.user._id?.toString() ?? "0");
  return (
    <div className="blog" data-testid="blogTestId">
      <h2>{`${title} ${author}`}</h2>
      <div>
        <a href={url}>{url}</a>
        <div id="likes">
          {`likes ${likes} `} <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{`added by ${blog.user.name}`}</div>
        {canDelete && (
          <button
            onClick={handleRemoveClick}
            style={{ backgroundColor: "blue", color: "white" }}
          >
            remove
          </button>
        )}
      </div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ModalAddComment />
    </div>
  );
};
