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

var _isXml = require('./is-xml');

var _isXml2 = _interopRequireDefault(_isXml);

// ---------------------------

// TODO: test

var DomReader = (function (_BaseReader) {
  _inherits(DomReader, _BaseReader);

  function DomReader($, contentType) {
    _classCallCheck(this, DomReader);

    _get(Object.getPrototypeOf(DomReader.prototype), 'constructor', this).call(this);
    this._contentType = contentType;
    this._$ = $;
  }

  _createClass(DomReader, [{
    key: 'toString',
    value: function toString() {
      var isXml = (0, _isXml2['default'])(this._contentType);
      return this._$[isXml ? 'xml' : 'html']();
    }
  }]);

  return DomReader;
})(_baseReader2['default']);

exports['default'] = DomReader;
module.exports = exports['default'];