/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _streams = require('./streams');

var _streams2 = _interopRequireDefault(_streams);

var _domReader = require('./dom-reader');

var _domReader2 = _interopRequireDefault(_domReader);

var _jsonReader = require('./json-reader');

var _jsonReader2 = _interopRequireDefault(_jsonReader);

var _paramReader = require('./param-reader');

var _paramReader2 = _interopRequireDefault(_paramReader);

var _bufferReader = require('./buffer-reader');

var _bufferReader2 = _interopRequireDefault(_bufferReader);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _events = require('events');

var Body = (function (_EventEmitter) {
  _inherits(Body, _EventEmitter);

  function Body() {
    _classCallCheck(this, Body);

    _get(Object.getPrototypeOf(Body.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Body, [{
    key: 'slow',

    // -------------------------------------------------

    value: function slow(opts) {
      if (opts) {
        this._setRawDataItem('slow', {
          latency: parseInt(opts.latency) || -1,
          rate: parseInt(opts.rate) || -1
        });
      }
      return this._getRawDataItem('slow');
    }

    // -------------------------------------------------

  }, {
    key: 'tee',
    value: function tee(writable) {
      var tees = this._getRawDataItem('tees') || [];
      tees.push(writable);
      this._setRawDataItem('tees', tees);
    }
  }, {
    key: '_tees',
    value: function _tees() {
      return this._getRawDataItem('tees') || [];
    }

    // -------------------------------------------------

  }, {
    key: '_setRawDataItem',
    value: function _setRawDataItem(name, value) {
      if (this._phase === 'request-sent' || this._phase === 'response-sent') {
        // TODO: test writability of requests and response in letious phases.
        var message = 'requests and responses are not writable during the ' + this._phase + ' phase';
        this.emit('log', {
          level: 'error',
          message: message,
          error: new Error(message)
        });
        return;
      }
      this._data[name] = value;
      this._populated = true;
    }
  }, {
    key: '_getRawDataItem',
    value: function _getRawDataItem(name) {
      return this._data[name];
    }
  }, {
    key: '_load',
    value: function _load() {
      var _this = this;

      if (this._source && this._source.stringable) {
        return _Promise.resolve();
      } else {
        var readable = this._source;
        if (this.headers['content-encoding'] === 'gzip') {
          // TODO: test coverage
          var gunzip = _zlib2['default'].createGunzip();
          readable = readable.pipe(gunzip);
        }
        return _streams2['default'].collect(readable).then(function (buffer) {
          delete _this.headers['content-encoding'];
          _this._source = _streams2['default'].from(buffer);
        });
      }
    }
  }, {
    key: '$',

    // TODO: test get and set for all five
    get: function get() {
      var src = this._source;
      return src ? src._$ : undefined;
    },
    set: function set($) {
      this._source = new _domReader2['default']($, this.headers['content-type']);
    }
  }, {
    key: 'json',
    get: function get() {
      var src = this._source;
      return src ? src._obj : undefined;
    },
    set: function set(obj) {
      this._source = new _jsonReader2['default'](obj);
    }
  }, {
    key: 'params',
    get: function get() {
      var src = this._source;
      return src ? src._params : undefined;
    },
    set: function set(params) {
      this._source = new _paramReader2['default'](params);
    }
  }, {
    key: 'buffer',
    get: function get() {
      var src = this._source;
      return src ? src._buffer : undefined;
    },
    set: function set(buffer) {
      this._source = new _bufferReader2['default'](buffer);
    }
  }, {
    key: 'string',
    get: function get() {
      if (this._source && this._source.stringable) {
        return this._source.toString();
      } else {
        return undefined;
      }
    },
    set: function set(str) {
      this._source = new _bufferReader2['default'](new Buffer(str, 'utf8'));
    }

    // -------------------------------------------------

  }, {
    key: '_source',
    get: function get() {
      return this._getRawDataItem('source');
    },
    set: function set(readable) {
      this._setRawDataItem('source', readable);
    }

    // -------------------------------------------------

  }, {
    key: 'httpVersion',
    get: function get() {
      return this._getRawDataItem('httpVersion');
    },
    set: function set(httpVersion) {
      this._setRawDataItem('httpVersion', httpVersion);
    }
  }]);

  return Body;
})(_events.EventEmitter);

exports['default'] = Body;
module.exports = exports['default'];