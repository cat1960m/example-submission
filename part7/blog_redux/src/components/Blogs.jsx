import { useRef, useEffect } from "react";
import CreateBlogForm from "./CreateBlogForm";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../reducers/BlogReducer";


export const Blogs = () => {
  const refCreateBlog = useRef();
  const loginUser = useSelector(state => state.login.user);
  const isLoggedIn = !!loginUser;

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  console.log("----blogs", blogs);


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
