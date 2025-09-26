import { useNotification } from "../hooks/useNotification";
import { Alert } from "@mui/material";

const Notification = () => {
  const { messageValue, setError } = useNotification();

  const handleClick = () => {
    setError("");
  };

  if (!messageValue.text) {
    return null;
  }

  return (
    <Alert
      severity={messageValue.isError ? "error" : "info"}
      data-testid="message"
      id="id_message"
      onClose={messageValue.isError && handleClick}
    >
      {messageValue.text}
    </Alert>
  );
};

export default Notification;
