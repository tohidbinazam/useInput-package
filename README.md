## introduction

# V-Tex Input v3.0.0

`A useful react hook to handle any type of input data just with an event` <br/>
You can use this package with any react ui library like React-Bootstrap, Material UI, Tailwind CSS, etc.

### Live demo with source code

`How to properly utilize the all benefit of this package?` <br/>

Live demo 👇

```HTML
https://vtex-input.onrender.com/
```

Source code 👇

```HTML
https://github.com/tohidbinazam/vtex-input-demo
```

## Getting started

### Installation

```bash
npm i vtex-input
```

### Usage

import the package

```JSX
import vtexInput from 'vtex-input';
```

### Example

```JSX
const [input, inputProps, form, setInput] = vtexInput({
    name: '',
    email: '',
    password: '',
    role: '',
    permissions: [],
    gender: '',
    photo: null,
    gallery: null,
  });
```

All input will be like those 👇

```JSX
<input
  {...inputProps('name', 'type')}
  placeholder='Give your email address'
/>;

<input
  id='index'
  {...inputProps('permissions', 'checkbox')}
  checked={input.permissions?.includes('value')}
  value='value'
  label='label'
/>;

{...inputProps('name', 'type')} // First argument is required it's input name and second argument is input type
```

If you not set second argument then you definitely set type="type of input" in input tag

Also same for file type input 👇

```JSX
<input
  {...inputProps('gallery', 'file')} multiple
/>;
```

### At latest update you get file url to display and remove file

#### input type file and `without` multiple attribute👇

```JS
const display_photo = input.photo.url

//If you need, You can find the file form input.photo.file
const photo_file = input.photo.file
```

photo == file type input name<br/>
It's give you an object with url and file

and remove the file<br/>

```JSX
<button onClick={() => form.delFile('photo')}>Delete</button>
```

photo = File type input name and it's required

#### input type file and `with` multiple attribute👇

gallery == file type input name<br/>
It's give you an array of url of the files

```JS
const photos = input.gallery.url

// If you need, You can find all file form input.gallery.files
const photos_file = input.gallery.file
```

and remove the file<br/>

```JSX
<button onClick={() => form.delFile('gallery', index)}>Delete</Button>
```

gallery == File type input name and it's required<br/>
index == you can get dynamic index from loop

_At all case you use url to display file_

Note:<br/>

1. Only the first argument is required, the rest are optional. <br/>
2. simply use a coma (,) to skip optional arguments. like this 👇

```JSX
// 1.
const [input, inputProps, form] = vtexInput({
  name: '',
  email: '',
  permissions: [],
});

// 2.
const [input, inputProps, , setInput] = vtexInput({
  name: '',
  email: '',
  permissions: [],
});


```

### Use form.clear() to reset the form

```JS
form.clear();
```

### Get all the input data as FormData object to send to the server

```JS
form.data();
```

### Get all the input data as an object

```JS
const allData = input
```

input == first argument of the hook that's store all the input data

Note:<br/>

1. If you not use any file type input then you can use `input` or `form.data()` as you like and simply use it in api (For this case i recommend to use `input` ) <br/>
2. If you use any file type input then you definitely use `form.data()` in api

### With file type input

```JS
axios.post('/api/v1/test/file', form.data()).then((res) => {
  console.log(res.data);
  form.clear();
});
```

### Without file type input

```JS
axios.post('/api/v1/test/file', input).then((res) => {
  console.log(res.data);
  form.clear();
});
```

Don't worry when you don't use any file type input, then you can use both (`input` or `form.data()`) type of input data in API as you like, But I will show you the best way to use it 👆

### Use setInput to set the custom value of the input as per your need

example 👇 I set a random string as password

```JS
setInput((prev) => ({
  ...prev,
  password: 'random_string'
}))
```

### If you face any problem, please let me know. I will try to solve it as soon as possible.

To knowing me, you just create an issue on github or e-mail me at [Tohid Bin Azam](mailto:tohidbinazamsunny1@gmail.com)
