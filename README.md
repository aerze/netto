# netto
ネット.js a small helper library for xhr in the browser or Node.js.
It is UMD compatible meaning you can use CommonJS/Node, AMD, or browser globals.

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
```
