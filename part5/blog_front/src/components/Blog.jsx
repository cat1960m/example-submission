import { useState } from "react";
import "../App.css";

const Blog = ({ blog, addLike, removeBlog, user, bodyShown }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleLikeClick = () => {
    addLike(blog);
  };

  const handleRemoveClick = () => {
    if (window.confirm("Do you want to delete blog ?")) {
      removeBlog(blog.id);
    }
  };

  const handleVisibilityChange = () => {
    setIsVisible(!isVisible);
    bodyShown?.("22");
  };

  const { url, title, author, likes } = blog;

  const canDelete = user &&
    (user?.userId.toString() ?? "0") === (blog.user._id?.toString() ?? "0");
  return (
    <div className="blog" data-testid="blogTestId">
      <div>
        <span >{title}{" "}</span>
        <button onClick={handleVisibilityChange}>
          {isVisible ? "hide" : "show"}
        </button>
      </div>
      {isVisible && (
        <div>
          <div>{url}</div>
          <div id="likes">
            {`likes ${likes} `} <button onClick={handleLikeClick}>like</button>
          </div>
          <div>{author}</div>
          {canDelete && (
            <button
              onClick={handleRemoveClick}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
