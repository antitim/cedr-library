'use strict';

/**
 * Функция сливает несколько библиотек в одну
 *
 * @param libs {Object[]} Массим библиотек
 *
 * @return {Object} Библиотека
 */
module.exports = (libs) => {
  let mergedLib = {};

  for (let i in libs) {
    let lib = libs[i];

    for (let j in lib) {
      let block = lib[j];

      if (mergedLib[j]) {
        mergedLib[j] = {
          templates: Object.assign({}, mergedLib[j].templates, block.templates),
          ast: Object.assign({}, mergedLib[j].ast, block.ast),
          styles: Object.assign({}, mergedLib[j].styles, block.styles),
          scripts: Object.assign({}, mergedLib[j].scripts, block.scripts)
        };
      } else {
        mergedLib[j] = Object.assign({}, block);
      }
    }
  }

  return mergedLib;
};
