'use strict';

require('chai').should();
const path = require('path');

let library = require('../lib/');


describe('Cedr-library', () => {
  it('load one library', (done) => {
    library('test/lib1', (lib) => {

      if (path.sep === '/') {
        lib.should.deep.equal({
          'menu': {
            templates: {
              'menu': '<div>Menu</div>',
              '__item': '<div>Menu item</div>'
            },
            ast: {
              '__item': [{
                'content': ['Menu item'],
                'tag': 'div'
              }],
              'menu': [{
                'content': ['Menu'],
                'tag': 'div'
              }]
            },
            styles: {
              'menu/style.css': 'test/lib1/menu/style.css'
            },
            scripts: {}
          },
          'page': {
            ast: {},
            templates: {},
            styles: {
              'page/style.css': 'test/lib1/page/style.css'
            },
            scripts: {}
          }
        });
        done();
      } else {
        lib.should.deep.equal({
          'menu': {
            templates: {
              'menu': '<div>Menu</div>',
              '__item': '<div>Menu item</div>'
            },
            ast: {
              '__item': [{
                'content': ['Menu item'],
                'tag': 'div'
              }],
              'menu': [{
                'content': ['Menu'],
                'tag': 'div'
              }]
            },
            styles: {
              'menu\\style.css': 'test\\lib1\\menu\\style.css'
            },
            scripts: {}
          },
          'page': {
            templates: {},
            ast: {},
            styles: {
              'page\\style.css': 'test\\lib1\\page\\style.css'
            },
            scripts: {}
          }
        });
        done();
      }
    });
  });

  it('load two library', (done) => {
    library(['test/lib1', 'test/lib2'], (lib) => {
      if (path.sep === '/') {
        lib.should.deep.equal({
          'menu': {
            templates: {
              'menu': '<div>Menu</div>',
              '__item': '<div>Menu item</div>'
            },
            ast: {
              '__item': [{
                'content': ['Menu item'],
                'tag': 'div'
              }],
              'menu': [{
                'content': ['Menu'],
                'tag': 'div'
              }]
            },
            styles: {
              'menu/style.css': 'test/lib1/menu/style.css'
            },
            scripts: {}
          },
          'page': {
            templates: {},
            ast: {},
            styles: {
              'page/style.css': 'test/lib2/page/style.css'
            },
            scripts: {}
          },
          'tabs': {
            templates: {
              'tabs': 'tabs'
            },
            ast: {
              'tabs': ['tabs']
            },
            styles: {
              'tabs/tabs.css': 'test/lib2/tabs/tabs.css'
            },
            scripts: {}
          }
        });
        done();
      } else {
        lib.should.deep.equal({
          'menu': {
            templates: {
              'menu': '<div>Menu</div>',
              '__item': '<div>Menu item</div>'
            },
            ast: {
              '__item': [{
                'content': ['Menu item'],
                'tag': 'div'
              }],
              'menu': [{
                'content': ['Menu'],
                'tag': 'div'
              }]
            },
            styles: {
              'menu\\style.css': 'test\\lib1\\menu\\style.css'
            },
            scripts: {}
          },
          'page': {
            templates: {},
            ast: {},
            styles: {
              'page\\style.css': 'test\\lib2\\page\\style.css'
            },
            scripts: {}
          },
          'tabs': {
            templates: {
              'tabs': 'tabs'
            },
            ast: {
              'tabs': ['tabs']
            },
            styles: {
              'tabs\\tabs.css': 'test\\lib2\\tabs\\tabs.css'
            },
            scripts: {}
          }
        });
        done();
      }
    });
  });
});
