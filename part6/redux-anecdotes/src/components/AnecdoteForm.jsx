import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showTime } from "../reducers/notificationReducer";
//import services from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = event.target.text.value;

    //  const newItem = await services.addNew({content: text, votes: 0});
    //  dispatch(createAnecdote(newItem));
    dispatch(createAnecdote(text));

    event.target.text.value = "";
    dispatch(showTime("new anecdote is created", 3));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
