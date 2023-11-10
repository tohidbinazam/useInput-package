## introduction

# V-Tex Input

`A useful react hook to handle any type of input data just with an event`

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
  name: "",
  email: "",
  permissions: [],
  photos: [],
  password: "",
});
```

All input will be like those 👇

```HTML
<input
  type="email"
  name="email"
  onChange={inputChange}
  value={input.email}
  placeholder="Email Address"
/>;

<input
  type="checkbox"
  name="permissions"
  id="index"
  // It required when you edit a form otherwise it's optional👇
  checked={input.permissions?.includes("value")}
  onChange={inputChange}
  value="value"
/>;

```

Also same for file type input 👇

```HTML
<input
  type="file"
  name="photos"
  onChange={inputChange}
  multiple
/>;
```

### At latest update you get file url to display and remove file

#### input type file and `without` multiple attribute👇

photo = file type input name<br/>
It's give you a single url of the file

```JS
const photo = input.photo.url

//If you need, You can find the file form input.photo.file
const photo_file = input.photos.file
```

and remove the file<br/>
photo = File type input name and it's required

```JSX
<button onClick={() => form.delFile('photo')}>Delete</button>
```

#### input type file and `with` multiple attribute👇

photos = file type input name<br/>
It's give you an array of url of the files

```JS
const photos = input.photos.urls

// If you need, You can find all file form input.photos.files
const photos_file = input.photos.files
```

and remove the file<br/>
photos = File type input name and it's required<br/>
index = you can get dynamic index from loop

```JSX
<button onClick={() => form.delFile('photos', index)}>Delete</Button>
```

_At all case you use url to display file_

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

### Use form.clear() to clear the form

```JS
form.clear();
```

### Get all the input data as FormData object

```JS
form.data();
```

### Get all the input data as an object

input = first argument of the hook that's store all the input data

```JS
const allData = input
```

Note:<br/>

1. If you not use any file type input then you can use `input` or `form.data()` as you like and simply use it in api (For this case i recommend to use `input` ) <br/>
2. If you use any file type input then you definitely use `form.data()` in api

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

Don't worry when don't use any file type input, you can use both (`input` or `form.data()`) type of input data in API as you like, But I will show you the best way to use it.

### Use setInput to set the custom value of the input as per your need

example 👇 I set a random string as password

```JS
setInput((prev) => ({
  ...prev,
  password: "random_string"
}))
```
