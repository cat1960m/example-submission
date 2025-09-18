import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const filtered = filter
    ? anecdotes.filter((item) => item.content.includes(filter))
    : [...anecdotes];

    console.log("fil", filtered);

  const sorted = filtered.sort((a, b) => (a.votes > b.votes ? -1 : 1));

  console.log("sorted", sorted, anecdotes);

  return (
    <div>
      {sorted.map((anecdote) => (
        <Anecdote anecdote={anecdote} key={anecdote.id} />
      ))}
    </div>
  );
};
export default AnecdoteList;
