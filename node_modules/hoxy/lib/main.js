/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

exports['default'] = {
  Proxy: _proxy2['default'],
  createServer: function createServer(opts) {
    return new _proxy2['default'](opts);
  }
};
module.exports = exports['default'];