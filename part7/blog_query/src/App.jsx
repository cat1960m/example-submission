import "./App.css";

import Notification from "./components/Notification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Blogs } from "./components/Blogs";
import { Blog } from "./components/Blog";

import { Users } from "./components/Users";
import { Menu } from "./components/Menu";
import { User } from "./components/User";

function App() {
  return (
    <Router>
      <Menu />
      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </Router>
  );
}

export default App;
