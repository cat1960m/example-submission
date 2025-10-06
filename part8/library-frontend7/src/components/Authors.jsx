/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import { UpdateAuthor } from "./UpdateAuthor";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const authors = result.data?.allAuthors.map((item) => ({
    name: item.name,
    born: item.born,
    bookCount: item.bookCount,
  }));

  if (result.loading) {
    console.log("result.isLoading", result.loading);
    return "...loading";
  }

  if (!authors) {
    return null;
  }

  console.log("result.data.allAuthors", result.data?.allAuthors);

  // const authors = [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th style={{ paddingRight: "10px" }}>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td style={{ paddingRight: "20px" }}>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Update author</h3>
      <UpdateAuthor setErr={props.notifyError} />
    </div>
  );
};

export default Authors;
