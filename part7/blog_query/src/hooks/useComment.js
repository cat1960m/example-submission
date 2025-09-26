import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "../services/blog";
import { useNotification } from "./useNotification";

export const useComment = () => {
  const client = useQueryClient();
  const { setError, setNotification } = useNotification();
  const mutation = useMutation({
    mutationFn: async ({ blogId, content }) => {
      const result = await services.addComment(content, blogId);
      return result.data;
    },
    onSuccess: (data) => {
      console.log("comment saved", data);
      client.invalidateQueries({ queryKey: ["blog"] });
      setNotification("comment is added");
    },
    onError: (error) => {
      console.log("error", error);
      setError(error.response?.data?.error ?? error.message);
    },
  });

  const addComment = (blogId, content) => {
    mutation.mutate({ blogId, content });
  };
  const isPending = mutation.isPending;

  return { addComment, isPending };
};
