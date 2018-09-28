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

var BufferReader = (function (_BaseReader) {
  _inherits(BufferReader, _BaseReader);

  function BufferReader(buffer) {
    _classCallCheck(this, BufferReader);

    _get(Object.getPrototypeOf(BufferReader.prototype), 'constructor', this).call(this);
    this._buffer = buffer;
  }

  _createClass(BufferReader, [{
    key: 'toString',
    value: function toString(encoding) {
      return this._buffer.toString(encoding);
    }
  }, {
    key: 'finalize',
    value: function finalize() {
      // noop since this._buffer already exists
    }
  }]);

  return BufferReader;
})(_baseReader2['default']);

exports['default'] = BufferReader;
module.exports = exports['default'];