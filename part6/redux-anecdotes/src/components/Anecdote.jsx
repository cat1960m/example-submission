/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { showTime } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(vote(anecdote));
    dispatch(showTime(`votes changed for "${anecdote.content}"`, 3));
  };
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

export default Anecdote;
