import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const CreateNew = (props) => {
  const content = useField("content");
  const author  = useField("author");
  const info  = useField("info");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.params.value,
      author: author.params.value,
      info: info.params.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.params} />
        </div>
        <div>
          author
          <input {...author.params} />
        </div>
        <div>
          url for more info
          <input {...info.params} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
