/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var levels = {
  debug: 100,
  info: 200,
  warn: 300,
  error: 400
};

var Logger = (function () {
  function Logger(level) {
    _classCallCheck(this, Logger);

    this._level = level;
  }

  _createClass(Logger, [{
    key: "log",
    value: function log(level, message) {
      if (!levels.hasOwnProperty(level)) {
        return;
      }
      if (levels[this._level] <= levels[level]) {
        console.error(message);
      }
    }
  }, {
    key: "debug",
    value: function debug(message) {
      if (levels[this._level] <= levels.debug) {
        console.error(message);
      }
    }
  }, {
    key: "info",
    value: function info(message) {
      if (levels[this._level] <= levels.info) {
        console.error(message);
      }
    }
  }, {
    key: "warn",
    value: function warn(message) {
      if (levels[this._level] <= levels.warn) {
        console.error(message);
      }
    }
  }, {
    key: "error",
    value: function error(message) {
      if (levels[this._level] <= levels.error) {
        console.error(message);
      }
    }
  }]);

  return Logger;
})();

exports["default"] = Logger;
module.exports = exports["default"];