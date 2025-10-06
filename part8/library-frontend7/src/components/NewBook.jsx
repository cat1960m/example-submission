/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";
import { updateCacheBooks } from "../utils";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
     // { query: ALL_BOOKS,  variables: { genre: "" }}, 
      { query: ALL_AUTHORS }],
    onError: (error) => {
      props.notifyError(error.message);
    },
    update: (cache, response) => {
      console.log("useMutation addbook", response)
      updateCacheBooks(cache, { query: ALL_BOOKS, variables: { genre: "" } }, response.data.addBook);
      props.changePage("books");
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres,
      },
    });

    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
