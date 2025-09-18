import { useBodyNotification } from "../context";

const Notification = () => {
  const { notification } = useBodyNotification();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: notification?.isError ? "red" : "black",
  };

  if (!notification?.text) return null;

  return <div style={style}>{notification.text}</div>;
};

export default Notification;
