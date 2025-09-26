import { useContext } from "react";
import MessageContext from "../context";

export const useNotification = () => {
  const [state, dispatch] = useContext(MessageContext);
  console.log("contextValue", state)
  const setText = (text, isError) => {
    if (text) {
      dispatch({
        type: isError ? "ERROR" : "NOTIFICATION",
        payload: text,
      });
      if (!isError) {
        setTimeout(
          () => {
            dispatch({ type: "CLEAR" });
          },
          isError ? 5000 : 3000
        );
      }
    } else {
      dispatch({ type: "CLEAR" });
    }
  };

  const setError = (text) => {
    setText(text, true);
  };

  const setNotification = (text) => {
    setText(text, false);
  };
  return {
    setNotification,
    setError,
    messageValue: { text: state.text ?? "", isError: state.isError },
  };
};
