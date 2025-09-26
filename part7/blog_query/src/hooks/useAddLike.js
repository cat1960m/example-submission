import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "../services/blog";
import { useNotification } from "./useNotification";

export const useAddLike = () => {
  const queryClient = useQueryClient();
  const { setError, setNotification } = useNotification();
  const mutation = useMutation({
    mutationFn: async (blog) => {
      const result = await services.updateBlog({
        ...blog,
        likes: blog.likes + 1,
      });
      return result.data;
    },

    onSuccess: (data) => {
      console.log("upd", data);
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      setNotification(`blog "${data.title}" is liked`);
    },

    onError: (error) => {
      setError(error.message);
    },
  });

  const addLike = (blog) => {
    mutation.mutate(blog);
  };

  return { addLike };
};
