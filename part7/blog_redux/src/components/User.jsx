import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../reducers/UserReducer";

export const User = () => {
  const userId = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("userId", userId);
    dispatch(getUser(userId));
  }, [userId, dispatch]);

  const user = useSelector((state) => state.user.user);

  console.log("user", userId, user);

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((item) => (
          <li key={item.id}><Link to={`/blogs/${item.id}`}>{item.title}</Link></li>
        ))}
      </ul>
    </>
  );
};
