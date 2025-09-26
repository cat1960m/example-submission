import { useState } from "react";
import { createBlog } from "../reducers/BlogReducer";
import { useDispatch } from "react-redux";

const CreateBlogForm = ({ refCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const clear = () => {
    refCreateBlog.current.toggle();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }, clear));
  };

  const labelStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  };

  return (
    <form
      onSubmit={handleCreateSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        maxWidth: "300px",
      }}
    >
      <div>
        <label style={labelStyle}>
          {`title: `}
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label style={labelStyle}>
          {`author: `}
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
          />
        </label>
      </div>

      <div>
        <label style={labelStyle}>
          {`url: `}
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            id="url"
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlogForm;
