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

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var ParamReader = (function (_BaseReader) {
  _inherits(ParamReader, _BaseReader);

  function ParamReader(params) {
    _classCallCheck(this, ParamReader);

    _get(Object.getPrototypeOf(ParamReader.prototype), 'constructor', this).call(this);
    this._params = params;
  }

  _createClass(ParamReader, [{
    key: 'toString',
    value: function toString() {
      return _querystring2['default'].stringify(this._params);
    }
  }]);

  return ParamReader;
})(_baseReader2['default']);

exports['default'] = ParamReader;
module.exports = exports['default'];