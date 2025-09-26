import { useState } from "react";
import { useCreateBlog } from "../hooks/useCreateBlog";


const CreateBlogForm = ({ refCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clear = () => {
    refCreateBlog.current.toggle();
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  const { createBlog } = useCreateBlog(clear);

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
  };

  return (
    <form onSubmit={handleCreateSubmit}>
      <div>
        <label>
          {`title: `}
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          {`author: `}
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
          />
        </label>
      </div>

      <div>
        <label>
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
