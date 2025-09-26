import { useParams } from "react-router-dom";

const Anecdote = ({ anecdote, vote }) => {
  const id = useParams().id;
  console.log("id=", id);
  if (!anecdote) {
    return null;
  }
  const { content, author, info, votes } = anecdote;

  return (
    <div>
      <h2>{content} </h2>
      <span>{`by ${author}`}</span>
      <div>{`has ${votes} votes`}</div>
      <div>
        for more info see{" "}
        <a href={info} target="_blank" rel="noopener noreferrer">
          {info}
        </a>
      </div>
      <div>
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
