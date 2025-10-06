/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

export const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => setError(error.graphQLErrors[0].message),
  });

  useEffect(() => {
    if(result.data) {
        const token = result.data.value;
        localStorage.setItem('phonenumbers-user-token', token)
        setToken(token)
    }
  }, [result.data, setToken])

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const handleChangeUserName = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username: <input value={username} onChange={handleChangeUserName} />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
