import { useQuery } from "@tanstack/react-query";
import services from "../services/blog";
import { useNotification } from "./useNotification";
import { useEffect } from "react";

export const useBlogsQuery = () => {
  const {  setError } = useNotification();

  const {
    data: blogs = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      console.log("useBlogsQuery");
      const result = await services.getBlogs();

      const sortedBlogs = [...result.data];
        sortedBlogs.sort((blog1, blog2) =>
          blog1.likes > blog2.likes ? -1 : 1
        );
      return sortedBlogs;
    },
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      console.log("err", error);
      setError(error.message ?? "error");
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);


  return { blogs };
};
