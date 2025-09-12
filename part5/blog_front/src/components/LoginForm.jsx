import { useState } from "react";

const LoginForm = ({ makeLogin }) => {
  const [userName, setUserName] = useState(/*"root"*/);
  const [password, setPassword] = useState(/*"uuuu_888G%%%%"*/);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    makeLogin({ userName, password });
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <label>
          {`username: `}
          <input value={userName} onChange={handleUserNameChange} />
        </label>
      </div>
      <div>
        <label>
          {`password: `}
          <input value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
