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
          ? {
              file: [...(prev[name]?.file || []), ...newFiles],
              url: [...(prev[name]?.url || []), ...urls],
            }
          : { file: files[0], url: urls[0] },
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

  const inputData = () => {
    const data = {};

    for (const key in input) {
      if (Array.isArray(input[key])) {
        data[key] = input[key];
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
