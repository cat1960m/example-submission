import { useState, useImperativeHandle } from "react";

const Togglable = ({ children, title, ref }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(!isVisible);
    console.log("-----toggle");
  };

  useImperativeHandle(ref, () => {
    return { toggle };
  });

  return (
    <>
      <div style={{ display: isVisible ? "none" : "block" }}>
        <button onClick={toggle}>{title}</button>
      </div>
      <div style={{ display: !isVisible ? "none" : "block" }}>
        <h2>{title}</h2>
        {children}
        <button onClick={toggle}>cancel</button>
      </div>
    </>
  );
};

export default Togglable;
