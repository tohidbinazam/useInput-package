import { useState } from 'react';

const useInput = (initialValue) => {
  const [input, setInput] = useState(initialValue);

  const inputChange = (e) => {
    const { type, name, checked, value, files, multiple } = e.target;

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

    if (type === 'file') {
      if (multiple) {
        const url = Array.from(files).map((file) => URL.createObjectURL(file));
        return setInput((prev) => ({
          ...prev,
          [name]: { files, url },
        }));
      } else {
        const url = URL.createObjectURL(files[0]);
        return setInput((prev) => ({
          ...prev,
          [name]: { file: files[0], url },
        }));
      }
    }

    return setInput((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => setInput(initialValue);

  const formData = () => {
    const formData = new FormData();

    for (const key in input) {
      if (Array.isArray(input[key])) {
        for (const item of input[key]) {
          formData.append(key, item);
        }
      } else if (input[key] && (input[key].file || input[key].files)) {
        if (input[key].file || input[key].files.length === 1) {
          formData.append(key, input[key].file || input[key].files[0]);
        } else {
          for (const file of input[key].files) {
            formData.append(key, file);
          }
        }
      } else {
        formData.append(key, input[key]);
      }
    }

    return formData;
  };

  const form = {
    data: formData,
    clear: clearForm,
  };

  return [input, inputChange, form, setInput];
};

export default useInput;
