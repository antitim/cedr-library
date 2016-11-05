'use strict';

const map = require('map-stream');
const vfs = require('vinyl-fs');
const path = require('path');

const TEMPLATE_EXT = ['html'];
const STYLE_EXT = ['css', 'sass', 'less', 'scss', 'pcss'];
const SCRIPT_EXT = ['js', 'coffee', 'ts'];

/**
 * Функция собирает всю необходимую информацию библиотеки блоков в объект
 *
 * @param pathToLib {String} Путь до библиотеки
 * @param callback {function}
 */
module.exports = (pathToLib, callback) => {
  let library = {};

  let scan = (file, cb) => {
    let pathToFile = path.relative(file.cwd, file.path);
    let relative = path.relative(pathToLib, pathToFile);
    let relativeSplit = relative === '' ? [] : relative.split(path.sep);

    // Если это папка и она лежит в корне библиотеки, то это папка с блоком
    if (file.isDirectory() && relativeSplit.length === 1) {
      let blockName = relative;
      library[blockName] ? null : library[blockName] = {
        templates: {},
        styles: {},
        scripts: {}
      };
    }

    // Если это файл и лежит не в корне библиотеки, то это файл блока
    if (!file.isDirectory() && relativeSplit.length > 1) {
      let blockName = relativeSplit[0];
      let extname = file.extname.slice(1);

      library[blockName] ? null : library[blockName] = {
        templates: {},
        styles: {},
        scripts: {}
      };

      // Файл шаблона
      if (TEMPLATE_EXT.indexOf(extname) !== -1) {
        library[blockName].templates[file.stem] = file.contents.toString();
      }

      // Файл стиля
      if (STYLE_EXT.indexOf(extname) !== -1) {
        library[blockName].styles[relative] = pathToFile;
      }

      // Файл скрипта
      if (SCRIPT_EXT.indexOf(extname) !== -1) {
        library[blockName].scripts[relative] = pathToFile;
      }
    }

    cb(null, file);
  };
  vfs.src([path.join(pathToLib, '**')])
    .pipe(map(scan))
    .on('end', () => {
      callback(library);
    });
};
