import { Link, useParams } from "react-router-dom";
import { useUserQuery } from "../hooks/useUserQuery";

export const User = () => {
  const userId = useParams().id;
  const { user } = useUserQuery(userId);

  console.log("userId", userId);

  if (!user) {
    return null;
  }
  const userName = user.name;

  return (
    <>
      <h2>{userName}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((item) => (
          <li key={item.id}>
            <Link to={`/blogs/${item.id}`}>
            {item.title}
            </Link>
            </li>
        ))}
      </ul>
    </>
  );
};
