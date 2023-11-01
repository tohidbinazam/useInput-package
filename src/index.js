import { useState } from 'react';

const useInput = (int) => {
  const [input, setInput] = useState(int);

  const inputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearFrom = () => setInput(int);

  return [input, inputChange, clearFrom, setInput];
};

export default useInput;
