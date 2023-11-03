import { useState } from 'react';

const useInput = (initialValue) => {
  const [input, setInput] = useState(initialValue);

  const inputChange = (e) => {
    const { type, name, checked, value } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        return setInput((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        return setInput((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }));
      }
    }

    return setInput((prev) => ({ ...prev, [name]: value }));
  };
  const clearForm = () => setInput(initialValue);

  return [input, inputChange, clearForm, setInput];
};

export default useInput;
