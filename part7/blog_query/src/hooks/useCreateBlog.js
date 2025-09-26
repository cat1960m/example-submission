import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "../services/blog";
import { useNotification } from "./useNotification";

export const useCreateBlog = (clear) => {
  const queryClient = useQueryClient();
  const { setNotification, setError } = useNotification();

  const createBlogMutation = useMutation({
    mutationFn: async ({ blog, token }) => {
      console.log("createBlogMutation", token);
      const result = await services.createBlog(blog, token);
      return result.data;
    },
    onSuccess: (data) => {
      //queryClient.invalidateQueries(["blogs"])
      console.log("created", data)
      const blogs = queryClient.getQueryData(["blogs"]);
      const blog =  { ...data, user: { _id: data.user } }
      queryClient.setQueryData(["blogs"], [...(blogs ?? []), blog]);
      setNotification(`${data.title} is created`);
      clear?.();
    },
    onError: (error) => {
      setError(error?.response?.data?.error ?? error.toString());
    },
  });

  const createBlog = (blog) => {
    const token = window.localStorage.getItem("token");
    createBlogMutation.mutate({ blog, token });
  };

  return { createBlog };
};