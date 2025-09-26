import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../reducers/UserReducer";

export const Users = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log("users", users);

  return (
    <>
      <h2>Users</h2>
      <h3>blogs created</h3>
      <div>
        {users.map((item) => (
          <div key={item._id.toString()}>
            <Link to={`/users/${item._id.toString()}`}>{item.name}</Link>
            {` ${item.blogs.length}`}
          </div>
        ))}
      </div>
    </>
  );
};
