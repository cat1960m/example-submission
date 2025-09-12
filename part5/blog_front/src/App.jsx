import { useState, useEffect, useRef } from "react";
import "./App.css";
import login from "./services/login";
import blogService from "./services/blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const refLogin = useRef();
  const refCreateBlog = useRef();

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const result = await blogService.getBlogs();
        console.log("result", result);

        const sortedBlogs = [...result.data];
        sortedBlogs.sort((blog1, blog2) =>
          blog1.likes > blog2.likes ? -1 : 1
        );

        setBlogs(sortedBlogs);
      } catch (error) {
        console.log("blogs error", error);
      }
    };

    getAllBlogs();
  }, []);

  const makeLogin = async (data) => {
    try {
      const result = await login(data);
      console.log("----result", result.data);

      window.localStorage.setItem("token", result.data.token);

      console.log("token", window.localStorage.getItem("token"));
      setUser(result.data);
      setMessage(`user logged`);
      window.setTimeout(() => setMessage(""), 3000);
      refLogin.current.toggle();
    } catch (error) {
      console.log("login error", error);
      setErrorMessage(`user log in is failed: ${error.toString()}`);
      window.setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleLogoutClick = () => {
    setUser(null);
    window.localStorage.removeItem("token");
    setMessage(`user log out`);
    window.setTimeout(() => setMessage(""), 3000);
  };

  const createNewBlog = async (data) => {
    try {
      const result = await blogService.createBlog(
        data,
        window.localStorage.getItem("token")
      );
      setBlogs([...blogs, { ...result.data, user: { _id: result.data.user } }]);
      console.log("create", result.data);
      setMessage(`blog created`);
      window.setTimeout(() => setMessage(""), 3000);
      refCreateBlog.current.toggle();
    } catch (error) {
      console.log("create error", error.toString());
      setErrorMessage(`blog creation is failed: ${error.toString()}`);
      window.setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const addLike = async (blog) => {
    const blogCorrected = { ...blog, likes: blog.likes + 1 };
    try {
      const result = await blogService.updateBlog(blogCorrected);

      const index = blogs.findIndex((itemBlog) => itemBlog.id === blog.id);

      if (index >= 0) {
        const newBlogs = [...blogs];
        newBlogs[index] = { ...result.data, user: newBlogs[index].user };
        newBlogs.sort((blog1, blog2) => (blog1.likes > blog2.likes ? -1 : 1));
        setBlogs(newBlogs);

        setMessage(`blog updated : ${result.data.title}`);
        window.setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.log("update error", error.toString());
      setErrorMessage(`blog updating is failed: ${error.toString()}`);
      window.setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const removeBlog = async (blogId) => {
    try {
      await blogService.removeBlog(
        blogId,
        window.localStorage.getItem("token")
      );
      const newBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(newBlogs);

      setMessage(`blog deleted`);
      window.setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log("delete error", error.toString());
      setErrorMessage(`blog deleting is failed: ${error.toString()}`);
      window.setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const isLoggedIn = !!user;

  return (
    <>
      <h2>blogs</h2>

      {message && (
        <div className="message" data-testid="message" id="id_message">
          {message}
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}

      {!isLoggedIn && (
        <Togglable title="log in to application" ref={refLogin}>
          <LoginForm makeLogin={makeLogin} />
        </Togglable>
      )}

      {isLoggedIn && (
        <div>
          <div>
            {`${user.name} is logged in `}
            <button onClick={handleLogoutClick}>logout</button>
          </div>

          <Togglable title="create new blog" ref={refCreateBlog}>
            <CreateBlogForm createNewBlog={createNewBlog} />
          </Togglable>
        </div>
      )}
      <div>
        {blogs.map((blog) => (
          <Blog
            blog={blog}
            key={blog.id}
            addLike={addLike}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </>
  );
}

export default App;
