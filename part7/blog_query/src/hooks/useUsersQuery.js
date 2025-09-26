import { useQuery } from "@tanstack/react-query";
import services from "../services/user";
import { useEffect } from "react";
import { useNotification } from "./useNotification";

export const useUsersQuery = () => {
  console.log("in useUsersQuery");
  const { setError } = useNotification();
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log("in fun");
      const result = await services.getUsers();
      console.log("users", result.data);
      return result.data;
    },
  });

  useEffect(() => {
    if (isError) {
      setError(error.response?.data.error ?? error.message);
    }
  }, [isError, error, setError]);

  console.log("data", data);

  return { users: data, isPending, isError };
};
