import { useQuery } from "@tanstack/react-query";
import services from "../services/user";
import { useEffect } from "react";
import { useNotification } from "./useNotification";

export const useUserQuery = (userId) => {
  const { setError } = useNotification();
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await services.getUser(userId);
      return result.data;
    },
    staleTime: 1000 * 3,
  });

  useEffect(() => {
    if (isError) {
      setError(error.response?.data.error ?? error.message);
    }
  }, [isError, error, setError]);

  console.log("data", data);

  return { user: data, isPending, isError };
};
