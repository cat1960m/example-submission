import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useRef } from "react";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import { useUser } from "../hooks/useUser";
import { AppBar, Toolbar, Container, Modal } from "@mui/material";

export const Menu = () => {
  const { makeLogin, logout } = useLogin();
  const { isLoggedIn, user } = useUser();
  const refLogin = useRef();

  return (
    <AppBar position="static">
        <Toolbar
          style={{
            padding: "5px",
            display: "flex",
            gap: "10px",
            backgroundColor: "lightgray",
            width: "100%"
          }}
        >
          <Link to="/users">users</Link>
          <Link to="/blogs">blogs</Link>
          {!isLoggedIn && (
            <Togglable title="log in to application" ref={refLogin}>
              <LoginForm makeLogin={makeLogin} />
            </Togglable>
          )}
          {isLoggedIn && (
            <div>
              <div>
                {`${user.name} is logged in `}
                <button onClick={logout}>logout</button>
              </div>
            </div>
          )}
        </Toolbar>
    </AppBar>
  );
};
