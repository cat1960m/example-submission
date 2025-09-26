import { useQuery } from "@tanstack/react-query";
import services from "../services/blog";
import { useEffect } from "react";
import { useNotification } from "./useNotification";
import { useParams } from "react-router-dom";

export const useBlogQuery = () => {
  const blogId = useParams().id;
  const {
    data: blog,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      console.log("useBlogQuery blogId", blogId);
      const result = await services.getBlog(blogId);
      return result.data;
    },
  });
  const { setError } = useNotification();

  const errorMessage = isError ? error.message : "";

  useEffect(() => {
    setError(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return { blog, errorMessage, isPending };
};
