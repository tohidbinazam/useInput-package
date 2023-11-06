## introduction

# V-Tex Input

`A useful react hook to handle any type of input data`

## Getting started

### Installation

```bash
npm i vtex-input
```

### Usage

import the package

```JS
import vtexInput from 'vtex-input';
```

### Example

```JS
const [input, inputChange, form, setInput] = vtexInput({
  email: "",
  password: "",
  permissions: [],
  file: [],
});
```

All input will be like this 👇

```HTML
<input
  type="text"
  name="name"
  onChange={inputChange}
  value={input.name}
  placeholder="Role name"
/>;
```

Note:<br/>

1. Only the first argument is required, the rest are optional. <br/>
2. If you use checkbox, then you have to pass an empty array as the initial value. <br/>
3. simply use a coma (,) to skip optional arguments. like this 👇

```JS
const [input, inputChange, , setInput] = vtexInput({
  name: "",
  email: "",
  permissions: [],
});
```

### Use clearForm to clear the form

```JS
form.clear();
```

### Get all the input data as an object

```JS
form.data();
```

Note:<br/>

1. If you not use any file type input then you can use "input" to get all the input data as an object. and simply use it in api <br/>

### With file type input

```JS
axios.post("/api/v1/test/file", form.data()).then((res) => {
  console.log(res);
  form.clear();
});
```

### Without file type input

```JS
axios.post("/api/v1/test/file", input).then((res) => {
  console.log(res);
  form.clear();
});
```

Don't worry you can use both type of input data in api as you like, But i will show you the best way to use it.

### Use setInput to set the custom value of the input as per your need

```JS
setInput({
  name: "John Doe",
  email: "johndoe@example.com"
  permissions: ["Order", "Product"],
  password: "random_string"
})
```
