import { useState } from "react";

const CreateBlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    createNewBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
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
          <input value={url} onChange={(event) => setUrl(event.target.value)} id="url"/>
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlogForm;
