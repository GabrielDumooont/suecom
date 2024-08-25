## Installation

```sh
npm install ngx-base64
```

## Usage

```js
import { fileToBase64 } from 'ngx-base64';

let file = event.target.files[0];

fileToBase64(file).subscribe(res => {
  console.log(res);
});

let base64String = fileToBase64Sync(file);
console.log(base64String);
```