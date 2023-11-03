## introduction

# V-Tex Input

`A useful react hook to handle any type of input data`

## Getting started

### Installation

```HTML
npm i vtex-input
```

### Usage

import the package

```HTML
import vtexInput from 'vtex-input';
```

### Example

```HTML
const [input, inputChange, clearForm, setInput] = vtexInput({
  name: "",
  email: "",
  permissions: [],
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

```HTML
const [input, inputChange, , setInput] = vtexInput({
  name: "",
  email: "",
  permissions: [],
});
```

### Use clearForm to clear the form

```HTML
clearForm()
```

### Use setInput to set the custom value of the input as per your need

```HTML
setInput({
  name: "John Doe",
  email: "johndoe@example.com"
  permissions: ["Order", "Product"],
  password: "random_string"
})
```
