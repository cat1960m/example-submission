import { useContext } from "react";
import MessageContext from "../context";

export const useUser = () => {
  const [state, dispatch] = useContext(MessageContext);

  const setUser = (user) => {
    dispatch({ type: "USER", payload: user });
  };

  const clearUser = () => {
    dispatch({ type: "USER", payload: null });
  };

  return { setUser, clearUser, user: state.user, isLoggedIn: !!state.user };
};
