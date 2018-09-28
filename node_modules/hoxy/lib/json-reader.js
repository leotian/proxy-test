/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseReader = require('./base-reader');

var _baseReader2 = _interopRequireDefault(_baseReader);

var JsonReader = (function (_BaseReader) {
  _inherits(JsonReader, _BaseReader);

  function JsonReader(obj) {
    _classCallCheck(this, JsonReader);

    _get(Object.getPrototypeOf(JsonReader.prototype), 'constructor', this).call(this);
    this._obj = obj;
  }

  _createClass(JsonReader, [{
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this._obj);
    }
  }]);

  return JsonReader;
})(_baseReader2['default']);

exports['default'] = JsonReader;
module.exports = exports['default'];