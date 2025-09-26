import { Link } from "react-router-dom";
import { useUsersQuery } from "../hooks/useUsersQuery";

export const Users = () => {
  const { users=[] } = useUsersQuery();

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
