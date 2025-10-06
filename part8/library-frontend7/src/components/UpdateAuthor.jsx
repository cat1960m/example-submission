/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

export const UpdateAuthor = ({ setErr }) => {
  const [id, setId] = useState("");
  const [year, setYear] = useState("");
  const [mutation, result] = useMutation(EDIT_AUTHOR, {
   refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setErr(error.graphQLErrors[0].message);
      setTimeout(() => setErr(""), 5000);
    },
  });

  const resultQuery = useQuery(ALL_AUTHORS);

  useEffect(() => {
    console.log("result?.data update", result?.data?.editAuthor)
    if (!result.data?.editAuthor && result.data) {
      setErr("not found");
      setTimeout(() => setErr(""), 3000);
    } else {
      setYear("");
      if (!result.data?.editAuthor?.born && result.data) {
        setErr("incorrect year");
        setTimeout(() => setErr(""), 3000);
        return;
      }
      setErr(null);
    }
  }, [result?.data]);

  useEffect(() => {
    if (resultQuery?.data?.allAuthors?.length) {
      setId(resultQuery.data.allAuthors[0].id);
    }
  }, [resultQuery?.data]);

  if (resultQuery.loading) {
    return "...loading";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const selName = resultQuery.data.allAuthors.find(
      (item) => item.id === id
    )?.name;
    console.log("selName", selName, id, resultQuery.data.allAuthors);

    if (selName) {
      mutation({ variables: { name: selName, year: parseInt(year) } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          {/* <input value={name} onChange={(e) => setName(e.target.value)} /> */}
          <select onChange={(event) => setId(event.target.value)} value={id}>
            {resultQuery.data.allAuthors.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}{" "}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Born:
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
      </div>
      <button type="submit"> OK</button>
    </form>
  );
};
