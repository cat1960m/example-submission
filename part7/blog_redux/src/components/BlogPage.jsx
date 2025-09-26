import "../App.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlogComments } from "../reducers/BlogReducer";
import { useEffect } from "react";
import { Blog } from "./Blog";

export const BlogPage = () => {
  const blogId = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogComments(blogId));
  }, [blogId]);

  return <Blog />;
};
