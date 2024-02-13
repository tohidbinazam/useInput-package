## Introduction

# V-Tex Input V4 Release

`A useful react hook to handle any type of input data for CRUD operation` <br/>
You can use this package with any react ui library like React-Bootstrap, Material UI, Tailwind CSS, etc.

### Live demo with source code

`How to properly utilize the all benefit of this package?` <br/>

Live demo 👇

```HTML
https://vtex-input.onrender.com/
```

Source code 👇

```HTML
https://github.com/tohidbinazam/vtex-input-app
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
const [input, inputProps, form, setValue] = vtexInput({
    // Hare you set all initial value for create and edit form operation
    name: '',
    email: '',
    password: '',
    role: '',
    permissions: '',
    gender: '',
    photo: '',
    gallery: '',
  });
```

All input will be like those 👇

```JSX
{...inputProps('name', 'type')}
// Both argument are required First is input name and second argument is input type

<input
  {...inputProps('name', 'text')}
  placeholder='Give your full name'
/>;

{...inputProps('name', 'type', 'value')}
// Only set the third argument when you use type == 'checkbox' or 'radio' and it's input value

<input
  id='index'
  {...inputProps('permissions', 'checkbox', 'product')}
  checked={input.permissions?.includes('product')}
/>;


```

Also same for file type input 👇

```JSX
<input
  {...inputProps('gallery', 'file')} multiple
/>;
```

### At latest update you get file url to display and remove file feature

#### input type file and `without` multiple attribute👇

photo == file type input name<br/>

```JS

<div>
  <img src={input.photo.url} alt='photo' />
  <button onClick={() => form.delFile('photo')}>Delete</button>
</div>

const photo_url = input.photo.url
// It's give you an url to show the file

const photo_file = input.photo.file
//If you need, You can find the file form input.photo.file

// Note that, "photo" is a single object from input object
```

and remove the file<br/>

```JSX
<button onClick={() => form.delFile('photo')}>Delete</button>
```

form.delFile('photo') function argument is File type input name and it's required

#### input type file and `with` multiple attribute👇

gallery == file type input name<br/>

```JS

input.gallery.map((data, index) => (
  <div key={index}>
    <img src={data.url} alt='gallery'/>
    <button onClick={() => form.delFile('gallery', index)}>
      Delete
    </button>
  </div>
))

const photos = input.gallery
// It's give you an array of object with url and file

const photo_url = data.url
// It's give you an url to show the file

const photo_file = data.file
//If you need, You can find the file form data.file

// Note that, "data" get from loop and it's a single object from input.gallery array
```

and remove the file<br/>

```JSX
<button onClick={() => form.delFile('gallery', index)}>Delete</button>
```

gallery == File type input name<br/>
index == you can get dynamic index from loop<br/>
form.delFile('gallery', index) function both arguments are required

_At all case you use url to display file_

### Note:

1. Only the first argument is required, the rest are optional. <br/>
2. simply use a coma (,) to skip optional arguments. like this 👇

```JSX
// 1.
const [input, inputProps, form] = vtexInput({
  name: '',
  email: '',
  permissions: '',
});

// 2.
const [input, inputProps, , setValue] = vtexInput({
  name: '',
  email: '',
  permissions: '',
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
form.input()

// If you send all input data with file input data to firebase or something else then you can use form.input() to get the all solid data
```

input == first argument of the hook that's store all data

Note:<br/>

1. If you not use any file type input then you can use `input` / `form.data()` / `form.input()` in your API(For this case i recommend to use `input` ) <br/>
2. If you use any file type input then you definitely use `form.data()` in API
3. If you get solid input data for FireBase or any other database then you can use `form.input()` to get all input data as an object

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

### Use setValue to set the custom value as per your need

example 👇 I set a random string as password

```JS
setValue({ password });
```

### If you face any problem, please let me know. I will try to solve it as soon as possible.

To knowing me, you just create an issue on github or e-mail me at [Tohid Bin Azam](mailto:tohidbinazamsunny1@gmail.com)
