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
      if (multiple) {
        const newFiles = Array.from(files);
        const urls = newFiles.map((file) => URL.createObjectURL(file));

        return setInput((prev) => ({
          ...prev,
          [name]: {
            files: prev[name]?.files
              ? [...prev[name].files, ...newFiles]
              : newFiles,
            urls: prev[name]?.urls ? [...prev[name].urls, ...urls] : urls,
          },
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

  const deleteFile = (name, index) => {
    if (index === undefined) {
      return setInput((prev) => ({
        ...prev,
        [name]: initialValue[name],
      }));
    }

    return setInput((prev) => ({
      ...prev,
      [name]: {
        files: prev[name].files.filter((file, i) => i !== index),
        urls: prev[name].urls.filter((url, i) => i !== index),
      },
    }));
  };

  const form = {
    data: formData,
    clear: clearForm,
    delFile: deleteFile,
  };

  const getInputProps = (name, type) => ({
    name,
    ...(type && { type }),
    onChange: inputChange,
    ...(type !== 'file' &&
      type !== 'radio' &&
      type !== 'checkbox' && { value: input[name] }),
  });

  return [input, inputChange, form, setInput, getInputProps];
};

export default useInput;
