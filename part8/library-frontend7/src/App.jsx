import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import { LoginForm } from "../../part8_client/src/components/LoginForm";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, BOOK_DELETED } from "./queries";
import { updateCacheBooks, updateCacheAuthors, clearCacheItem } from "./utils";

const App = () => {
  const [page, setPage] = useState("login");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log("data created in other------", data);
      const addedBook = data.data.bookAdded;
      notifyError(`${addedBook.title} added`);
      updateCacheBooks(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: "" } },
        addedBook
      );
      updateCacheAuthors(
        client.cache,
        { query: ALL_AUTHORS },
        addedBook.author.name
      );
    },
  });


  useSubscription(BOOK_DELETED, {
    onData: ({ data, client }) => {
      console.log("data deleted in other------", data);
      const deletedBook = data.data.bookDeleted;
      notifyError(`${deletedBook.id} deleted`);
      clearCacheItem(client.cache, "allBooks", { genre: selectedGenre })
      clearCacheItem(client.cache, "allAuthors")
      /*   updateCacheDeleteBook(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: "" } },
        data.data.bookDeleted.id
      ); */
    },
  });

  const logout = () => {
    setToken("");
    localStorage.clear();
    client.clearStore();
    setPage("login");
  };

  const notifyError = (error) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 10000);
  };

  const changeToken = (token) => {
    setToken(token);
    setPage("authors");
  };

  const changePage = (name) => {
    changeGenre("");
    setPage(name);
  };

  const changeGenre = (newGenre) => {
    clearCacheItem(client.cache, "allBooks", { genre: selectedGenre })
    setSelectedGenre(newGenre);
  };

  return (
    <div>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      {page === "authors" ? <Authors notifyError={notifyError} /> : null}

      {page === "books" ? (
        <Books selectedGenre={selectedGenre} changeGenre={changeGenre} />
      ) : null}

      {page === "add" ? (
        <NewBook notifyError={notifyError} changePage={changePage} />
      ) : null}

      {page === "login" ? (
        <LoginForm setToken={changeToken} setError={notifyError} />
      ) : null}
    </div>
  );
};

export default App;
