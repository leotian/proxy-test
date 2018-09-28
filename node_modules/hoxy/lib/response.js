/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _streams = require('./streams');

var _streams2 = _interopRequireDefault(_streams);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * Represents an HTTP response.
 */

var Response = (function (_Body) {
  _inherits(Response, _Body);

  function Response() {
    _classCallCheck(this, Response);

    _get(Object.getPrototypeOf(Response.prototype), 'constructor', this).call(this);
    this._data = {
      statusCode: 200,
      headers: {},
      slow: {}
    };
  }

  /**
   * Getter/setter for HTTP status code.
   */

  _createClass(Response, [{
    key: '_setHttpSource',
    value: function _setHttpSource(inResp) {
      this.httpVersion = inResp.httpVersion;
      this.statusCode = inResp.statusCode;
      this.headers = inResp.headers;
      inResp._isOriginal = true;
      this._source = inResp;
    }
  }, {
    key: '_setRawDataItem',
    value: function _setRawDataItem() {
      if (this._phase === 'response') {
        var message = 'requests are not writable during the response phase';
        this.emit('log', {
          level: 'error',
          message: message,
          error: new Error(message)
        });
        return undefined;
      }
      return _body2['default'].prototype._setRawDataItem.apply(this, arguments);
    }

    /*
     * Prepare this response for sending by removing internal contradictions and
     * otherwise shoring up any HTTP spec violations.
     *
     * TODO: emit debug log events for things that are changed.
     */
  }, {
    key: '_finalize',
    value: function _finalize() {
      var _this = this;

      if (!this._data.source) {
        this._data.source = _streams2['default'].from(new Buffer(''));
      }

      if (!this._source._isOriginal) {
        delete this.headers['content-length'];
        if (typeof this._source.finalize === 'function') {
          this._source.finalize();
        }
        if (typeof this._source.size === 'function') {
          delete this.headers['transfer-encoding'];
          this.headers['content-length'] = this._source.size();
        }
      }

      _Object$keys(this.headers).forEach(function (name) {
        // TODO: test
        if (_this.headers[name] === undefined) {
          delete _this.headers[name];
        }
      });

      return this;
    }
  }, {
    key: 'statusCode',
    get: function get() {
      return this._getRawDataItem('statusCode');
    },
    set: function set(code) {
      code = parseInt(code);
      if (!code) {
        throw new Error('invalid status code'); // TODO: test this
      }
      this._setRawDataItem('statusCode', code);
    }

    /**
     * Getter/setter for HTTP response header object.
     */
  }, {
    key: 'headers',
    get: function get() {
      return this._getRawDataItem('headers');
    },
    set: function set(headers) {
      this._setRawDataItem('headers', _lodash2['default'].extend({}, headers));
    }
  }]);

  return Response;
})(_body2['default']);

exports['default'] = Response;
module.exports = exports['default'];