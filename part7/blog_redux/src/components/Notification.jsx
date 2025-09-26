import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../reducers/NotificationReducer";

const Notification = () => {
  const { text, isError } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setError(""));
  };

  if (!text) {
    return null;
  }

  return (
    <Alert
      severity={isError ? "error" : "info"}
      data-testid="message"
      id="id_message"
      onClose={isError && handleClick}
    >
      {text}
    </Alert>
  );
};

export default Notification;
