import { useMutation } from "@tanstack/react-query";
import loginUser from "../services/login";
import { useNotification } from "./useNotification";
import { useUser } from "./useUser";

export const useLogin = () => {
  const { setUser, clearUser } = useUser();
  const { setNotification, setError } = useNotification();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const result = await loginUser(data);
      return result.data;
    },

    onSuccess: (data) => {
      const token = data.token;
      window.localStorage.setItem("token", token);
      setUser(data);
      setNotification("user is log in");
    },

    onError: (error) => {
      setError(error.message);
    },
  });

  const makeLogin = (data) => {
    mutation.mutate(data);
  };

  const logout = () => {
    clearUser();
    window.localStorage.removeItem("token");
    setNotification(`user log out`);
  };

  return { makeLogin, logout };
};
