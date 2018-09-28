/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

"use strict";

var _Promise = require("babel-runtime/core-js/promise")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = wait;

function wait(t) {
  return new _Promise(function (res) {
    if (t) {
      setTimeout(res, t);
    } else {
      setImmediate(res);
    }
  });
}

module.exports = exports["default"];