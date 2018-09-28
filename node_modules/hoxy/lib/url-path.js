/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var Path = (function () {
  function Path(origPath) {
    _classCallCheck(this, Path);

    this._origPath = origPath;
    var steps = origPath.split(/[\\\/]/g);
    if (/^[a-z]:$/i.test(steps[0])) {
      this._isAbsolute = true;
      this._drive = steps.shift();
    } else {
      this._drive = '';
      if (!steps[0]) {
        steps.shift();
        this._isAbsolute = true;
      }
    }
    this._steps = steps;
  }

  _createClass(Path, [{
    key: 'toUrlPath',
    value: function toUrlPath() {
      var urlPath = this._steps.join('/');
      if (this._isAbsolute) {
        urlPath = '/' + urlPath;
      }
      return urlPath;
    }
  }, {
    key: 'toSystemPath',
    value: function toSystemPath() {
      var filePath = this._steps.join(_path2['default'].sep);
      if (this._isAbsolute) {
        filePath = this._drive + _path2['default'].sep + filePath;
      }
      return filePath;
    }
  }, {
    key: 'rootTo',
    value: function rootTo(rootPath) {
      if (!rootPath._isAbsolute) {
        throw new Error('root path is not absolute');
      } else {
        var newPath = new Path(this._origPath);
        newPath._steps = rootPath._steps.concat(this._steps);
        newPath._drive = rootPath._drive;
        newPath._isAbsolute = true;
        return newPath;
      }
    }
  }]);

  return Path;
})();

exports['default'] = Path;
module.exports = exports['default'];