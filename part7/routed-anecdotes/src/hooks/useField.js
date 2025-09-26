import { useState } from "react";

// eslint-disable-next-line no-unused-vars
export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  const reset = () => {
    setValue("");
  }

  return { params:{name, onChange, value} , reset};
};
