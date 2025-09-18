import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "message":
      return { text: action.payload, isError: false };
    case "hide":
      return null;
    case "error":
      return { text: action.payload, isError: true };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [result, dispatch] = useReducer(reducer, null);

  return (
    <NotificationContext.Provider value={[result, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useDispatchNotification = () => {
  const [text, dispatch] = useContext(NotificationContext);

  const showMessage = (textNew) => {
    dispatch({ type: "message", payload: textNew });
    window.setTimeout(() => dispatch({ type: "hide" }), 3000);
  };

  const showError = (textNew) => {
    dispatch({ type: "error", payload: textNew });
    window.setTimeout(() => dispatch({ type: "hide" }), 3000);
  };

  return { showMessage , showError};
};

export const useBodyNotification = () => {
  const [notification] = useContext(NotificationContext);

  return { notification };
};

export default NotificationContext;
