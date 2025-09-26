import { Link } from "react-router-dom";
import { useRef } from "react";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import { AppBar, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, makeLoginUser } from "../reducers/LoginUserReducer";

export const Menu = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.login.user);
  const isLoggedIn = !!loginUser;
  const refLogin = useRef();

  const makeLogin = (data) => {
    console.log("make LOgin");
    dispatch(makeLoginUser(data));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          padding: "5px",
          display: "flex",
          gap: "10px",
          backgroundColor: "lightgray",
          width: "100%",
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
              {`${loginUser.name} is logged in `}
              <button onClick={logout}>logout</button>
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
