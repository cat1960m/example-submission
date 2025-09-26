import { createContext, useReducer } from "react";

const MessageContext = createContext();

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return { ...state, text: action.payload, isError: false };
    case "ERROR":
      return { ...state, text: action.payload, isError: true };
    case "CLEAR":
      return { ...state, text: "", isError: false };
    case "USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <MessageContext.Provider value={[state, dispatch]}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
