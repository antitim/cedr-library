'use strict';

const stream = require('stream');
const map = require('map-stream');

const merge = require('./cedr-library-merge');
const library = require('./cedr-library');

module.exports = (pathTolibs, callback) => {
  /**
   * Нормализация входного параметра
   */
  if (typeof pathTolibs === 'string') {
    pathTolibs = [pathTolibs];
  }

  let libs = {};
  let src = new stream.Readable({ objectMode: true });

  src.pipe(map((data, cb) => {
    let pathToLib = data.toString();
    /**
     * Собираем библиотеку по адресу pathToLib
     */
    library(pathToLib, (lib) => {
      libs[pathToLib] = lib;
      cb();
    });
  })).on('end', () => {
    /**
     * Сортируем библиотеки в том порядке, в каком были заданы пути к ним
     */
    let orderedLibs = pathTolibs.map((item) => {
      return libs[item];
    });

    let mergedlibrary = merge(orderedLibs);
    callback(mergedlibrary);
  });

  /**
   * Добавляем библиотеки в поток
   */
  for (let lib of pathTolibs) {
    src.push(lib);
  }

  src.push(null);
};
