import { useState } from 'react';

const useInput = (initialValue) => {
  const [input, setInput] = useState(initialValue);

  const inputChange = (e) => {
    const { type, name, checked, value, files, multiple } = e.target;

    if (type === 'checkbox') {
      return setInput((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    }

    if (type === 'file') {
      const newFiles = Array.from(files);
      const urls = newFiles.map((file) => URL.createObjectURL(file));

      return setInput((prev) => ({
        ...prev,
        [name]: {
          file: multiple
            ? [...(prev[name]?.file || []), ...newFiles]
            : files[0],
          url: multiple ? [...(prev[name]?.url || []), ...urls] : urls[0],
        },
      }));
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
      } else if (input[key] && input[key].file) {
        const files = Array.isArray(input[key].file)
          ? input[key].file
          : [input[key].file];
        for (const file of files) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, input[key]);
      }
    }

    return formData;
  };

  const deleteFile = (name, index) => {
    setInput((prev) => {
      const updatedValue = Array.isArray(prev[name]?.url)
        ? {
            file: prev[name].file.filter((file, i) => i !== index),
            url: prev[name].url.filter((url, i) => i !== index),
          }
        : initialValue[name];

      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  };

  const inputProps = (name, type) => ({
    name,
    ...(type && { type }),
    onChange: inputChange,
    ...(type !== 'file' &&
      type !== 'radio' &&
      type !== 'checkbox' && { value: input[name] }),
  });

  const form = {
    data: formData,
    clear: clearForm,
    delFile: deleteFile,
  };

  return [input, inputProps, form, setInput];
};

export default useInput;
