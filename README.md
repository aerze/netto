# netto 
[![Build Status](https://travis-ci.org/aerze/netto.svg?branch=master)](https://travis-ci.org/aerze/netto)

ネット.js a small helper library for xhr in the browser or Node.js.
It is UMD compatible meaning you can use CommonJS/Node.js, AMD, or browser globals.

To install
```bash
npm install netto --save
```

Example 
```js
var net = require('netto');
net.root = 'jsonplaceholder.typicode.com';

// If the callback for the get method is null,
// the callback defaults to one similar to the
// the log function
var log = function (err, data) {
    if (err) throw err;
    else console.log(data);
};

net.get('/posts/1', log);
// returns
// {
//   "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body": "quia et suscipit
//   suscipit recusandae consequuntur expedita et cum
//   reprehenderit molestiae ut ut quas totam
//   nostrum rerum est autem sunt rem eveniet architecto"
// }
```

To test
In the /netto directory
```bash
npm install && npm test
```
