import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification && (
      <div style={{ border: "solid", padding: "5px", margin: "5px" }}>
        {notification}
      </div>
    )}
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          {<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>}
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
