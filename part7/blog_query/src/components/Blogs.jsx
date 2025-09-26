import { useRef } from "react";
import CreateBlogForm from "./CreateBlogForm";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useBlogsQuery } from "../hooks/useBlogsQuery";

export const Blogs = () => {
  const { blogs } = useBlogsQuery();

  const refCreateBlog = useRef();
  const { user } = useUser();
  const isLoggedIn = !!user;

  return (
    <div>
      {isLoggedIn && (
        <div>
          <Togglable title="create new blog" ref={refCreateBlog}>
            <CreateBlogForm refCreateBlog={refCreateBlog} />
          </Togglable>
        </div>
      )}
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};
