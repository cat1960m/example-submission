/* eslint-disable react/prop-types */
import { useQuery, useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, REMOVE_BOOK } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const { selectedGenre, changeGenre } = props;

  const [deleteBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [
      {
        query: ALL_BOOKS,
        variables: { genre: selectedGenre },
      },
      { query: ALL_AUTHORS },
    ],
  });

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  useEffect(() => {
    const getGenres = () => {
      const allBooks = result.data?.allBooks ?? [];
      const genres = allBooks.reduce((result, book) => {
        const bookGenres = book.genres ?? [];
        bookGenres.forEach((genre) => {
          if (!result.includes(genre)) {
            result.push(genre);
          }
        });
        return result;
      }, []);

      return genres;
    };

    if (result.data?.allBooks) {
      const genres = getGenres();
       console.log("-----all books result.data changed genres=",   genres, "selectedGenre=", selectedGenre);

      if (selectedGenre && !genres.includes(selectedGenre)) {
        changeGenre("");
      }

      setGenres(genres);
    }
  }, [result.data, selectedGenre]);

  if (result.loading) {
    console.log("result.isLoading----", result.loading);
    return "...Loading";
  }

  console.log("result.isLoading----", result.loading);

  /* const books = !selectedGenre
    ? result.data?.allBooks ?? []
    : (result.data?.allBooks ?? []).filter((book) =>
        book.genres.includes(selectedGenre)
      ); */

  const books = result.data?.allBooks ?? [];

  const handleRemoveBook = async (id) => {
    const deletedId = await deleteBook({ variables: { id } });
    console.log("deletedId", deletedId);
  };

  console.log("books", books);

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && (
        <h3>{`Book in your favorite genre: ${selectedGenre}`}</h3>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th></th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(";")}</td>
              <td>
                <button onClick={() => handleRemoveBook(a.id)}>remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>genres</h3>
      <div>
        {genres.map((genre) => (
          <label
            key={genre}
            style={{ paddingRight: "30px", whiteSpace: "nowrap" }}
          >
            <input
              type="radio"
              name="genres>"
              value={genre}
              checked={selectedGenre === genre}
              onChange={() => changeGenre(genre)}
            />
            {genre}
          </label>
        ))}
        <label>
          <input
            type="radio"
            name="genres>"
            value={""}
            checked={selectedGenre === ""}
            onChange={() => changeGenre("")}
          />
          {"all"}
        </label>
      </div>
    </div>
  );
};

export default Books;
