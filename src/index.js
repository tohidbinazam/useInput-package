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
        [name]: multiple
          ? [
              ...(prev[name] || []),
              ...newFiles.map((file, i) => ({
                file,
                url: urls[i],
              })),
            ]
          : { file: files[0], url: urls[0] },
      }));
    }

    return setInput((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => setInput(initialValue);

  const formData = () => {
    const data = new FormData();

    for (const key in input) {
      if (input[key] && Array.isArray(input[key]) && input[key][0]?.file) {
        input[key].forEach((item) => data.append(key, item.file));
      } else if (input[key] && input[key].file) {
        data.append(key, input[key].file);
      } else if (Array.isArray(input[key])) {
        for (const item of input[key]) {
          data.append(key, item);
        }
      } else {
        data.append(key, input[key]);
      }
    }

    return data;
  };

  const inputData = () => {
    const data = {};

    for (const key in input) {
      if (input[key] && Array.isArray(input[key]) && input[key][0]?.file) {
        data[key] = input[key].map((item) => item.file);
      } else if (input[key] && input[key].file) {
        data[key] = input[key].file;
      } else {
        data[key] = input[key];
      }
    }
    return data;
  };

  const deleteFile = (name, index) => {
    setInput((prev) => {
      const updatedValue = Array.isArray(prev[name])
        ? prev[name].filter((_, i) => i !== index)
        : initialValue[name];

      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  };

  const inputProps = (name, type, value) => ({
    name,
    ...(type && { type }),
    onChange: inputChange,
    ...(type === 'file' || type === 'radio' || type === 'checkbox'
      ? value && { value }
      : { value: input[name] }),
  });

  const setValue = (values) => setInput((prev) => ({ ...prev, ...values }));

  const form = {
    data: formData,
    input: inputData,
    clear: clearForm,
    delFile: deleteFile,
  };

  return [input, inputProps, form, setValue];
};

export default useInput;
