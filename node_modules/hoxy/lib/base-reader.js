/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _stream = require('stream');

var BaseReader = (function (_Readable) {
  _inherits(BaseReader, _Readable);

  function BaseReader() {
    _classCallCheck(this, BaseReader);

    _get(Object.getPrototypeOf(BaseReader.prototype), 'constructor', this).call(this, {});
  }

  _createClass(BaseReader, [{
    key: 'finalize',
    value: function finalize() {
      var body = this.toString();
      this._buffer = new Buffer(body, 'utf8');
    }
  }, {
    key: '_read',
    value: function _read() {
      if (this._buffer) {
        this.push(this._buffer);
        delete this._buffer;
      } else {
        this.push(null);
      }
    }
  }, {
    key: 'size',
    value: function size() {
      return this._buffer.length;
    }
  }, {
    key: 'toString',
    value: function toString() {
      throw new Error('toString() not overridden');
    }
  }, {
    key: 'stringable',
    get: function get() {
      return true;
    }
  }]);

  return BaseReader;
})(_stream.Readable);

exports['default'] = BaseReader;
module.exports = exports['default'];