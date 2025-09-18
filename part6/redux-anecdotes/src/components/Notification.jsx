import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification) ?? "";
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: "10px",
  };

  if (!message) {
    return null;
  }

  return <div style={style}>{message.toString()}</div>;
};

export default Notification;
