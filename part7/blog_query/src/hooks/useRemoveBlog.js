import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "../services/blog";

import { useNotification } from "./useNotification";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useRemoveBlog = () => {
  const queryClient = useQueryClient();
  const { setError, setNotification } = useNotification();
  const blogId = useRef("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ id, token }) => {
      await services.removeBlog(id, token);
    },

    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const blog = blogs.find(
        (item) => item.id.toString() === blogId.current.toString()
      );
      console.log("del", blog.title);

      setNotification(`blog "${blog.title}" is  deleted`);
      const newBlogs = blogs.filter(
        (item) => item.id.toString() !== blogId.current.toString()
      );
      queryClient.setQueryData(["blogs"], newBlogs);
      navigate("/blogs");
    },

    onError: (error) => {
      setError(error.message);
    },
  });

  const removeBlog = (id) => {
    const token = window.localStorage.getItem("token");
    blogId.current = id;
    mutation.mutate({ id, token });
  };

  return { removeBlog };
};
