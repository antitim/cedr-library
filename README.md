# cedr-library [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Cedr-library - loader library blocks.

## Installation

```sh
$ npm install --save cedr-library
```

## Usage

Used in conjunction with [cedr](https://github.com/antitim/cedr). Needed to create object library from the folder blocks.
It is possible to upload multiple folders with the subsequent redefinition in a single library.

```js
const library = required('cedr-library');

library(['path/to/lib1', 'path/to/lib2'], (lib) => {
  // your code here
});

```

## The folder structure of the library

```
  Lib1
    block1
      - block1.html // template block
      - __item.html // template element item of block
      - __something.html // template element something of block
      - mystyle.css //block style
      - myscript.js //block script
    block2
    block3
    block4
```

For templates it is important to have the correct file name. 
Name starting with '__' refers to the block element. 
The name coincides with the name of a block refer to the block template.

For stylesheets and scripts it is important file extension:
 - scripts: 'js', 'coffee', 'ts'.
 - styles: 'css', 'sass', 'less', 'scss', 'pcss'.

The location of the files in the folder of block does not matter.

## API
cedr-library can be called with one and more path to library.

### cedr-library(libraries, callback)

#### libraries
Type: `String[]` or `String`

Path to library or Array of paths to libraries

#### callback
Type: `Function`

Called when the library is loaded. Argument is passed the library.


## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/cedr-library.svg
[npm-url]: https://npmjs.org/package/cedr-library
[travis-image]: https://travis-ci.org/antitim/cedr-library.svg?branch=master
[travis-url]: https://travis-ci.org/antitim/cedr-library
[daviddm-image]: https://david-dm.org/antitim/cedr-library.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/antitim/cedr-library
