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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var validProtocols = {
  'http:': true,
  'https:': true
};

var removeHeaders = {
  'accept-encoding': true, // until proxy handles gzip
  'proxy-connection': true,
  'proxy-authorization': true
};

var nonEntityMethods = {
  GET: true,
  HEAD: true,
  TRACE: true
};

/**
 * Represents an HTTP request.
 */

var Request = (function (_Body) {
  _inherits(Request, _Body);

  function Request() {
    _classCallCheck(this, Request);

    _get(Object.getPrototypeOf(Request.prototype), 'constructor', this).call(this);
    this._data = { slow: {} };
  }

  /**
   * Getter/setter for HTTP protocol, e.g. 'http:'
   */

  _createClass(Request, [{
    key: 'fullUrl',
    value: function fullUrl(u) {
      if (u) {
        var purl = _url2['default'].parse(u);
        if (purl.protocol) {
          this.protocol = purl.protocol;
        }
        if (purl.hostname) {
          this.hostname = purl.hostname;
        }
        if (purl.port) {
          this.port = purl.port;
        } else {
          this.port = undefined;
        }
        if (purl.path) {
          this.url = purl.path;
        }
        return undefined;
      } else {
        var portStr = '';
        var declaredPort = this.port;
        if (declaredPort) {
          portStr = ':' + declaredPort;
        }
        return this.protocol + '//' + this.hostname + portStr + this.url;
      }
    }
  }, {
    key: '_setHttpSource',
    value: function _setHttpSource(inReq, reverse) {
      var u = inReq.url;
      if (reverse) {
        u = _url2['default'].resolve(reverse, u);
      }
      var purl = _url2['default'].parse(u);
      if (reverse) {
        inReq.headers.host = purl.host;
        if (!purl.protocol) {
          throw new Error('missing protocol on reverse proxy');
        }
      }
      var host = (function () {
        var aHost = inReq.headers.host;
        var result = {};
        if (aHost) {
          var matches = aHost.match(/^([^:]+)(:([\d]+))?$/);
          if (matches) {
            result.name = matches[1];
            var _port = parseInt(matches[3]);
            if (_port) {
              result.port = _port;
            }
          }
        }
        return result;
      })();
      this.httpVersion = inReq.httpVersion;
      this.headers = inReq.headers;
      this.protocol = purl.protocol || 'http:';
      this.hostname = purl.hostname || host.name;
      var port = purl.port || host.port;
      if (port) {
        this.port = port;
      }
      //this.port = purl.port || host.port || this._getDefaultPort()
      this.method = inReq.method;
      this.url = purl.path;
      inReq._isOriginal = true;
      this._source = inReq;
    }

    /**
     * Returns the default port given the current protocol.
     */
  }, {
    key: '_getDefaultPort',
    value: function _getDefaultPort() {
      return this.protocol === 'https:' ? 443 : 80;
    }

    // TODO: emit debug log events for things that are changed.
  }, {
    key: '_finalize',
    value: function _finalize() {
      var _this = this;

      if (nonEntityMethods.hasOwnProperty(this.method)) {
        this.string = ''; // TODO: test
      }
      if (!this._source) {
        this.string = ''; // TODO: test?
      }

      if (!this._source._isOriginal) {
        delete this.headers['content-length'];
        if (typeof this._source.finalize === 'function') {
          this._source.finalize();
        }
        if (typeof this._source.size === 'function') {
          this.headers['content-length'] = this._source.size();
        }
      }

      _Object$keys(this.headers).forEach(function (name) {
        // TODO: test
        if (removeHeaders.hasOwnProperty(name)) {
          delete _this.headers[name];
        } else if (_this.headers[name] === undefined) {
          delete _this.headers[name];
        }
      });

      // TODO: test host header correction
      var portStr = '';
      var declaredPort = this.port;
      if (declaredPort) {
        portStr += ':' + declaredPort;
      }
      this.headers.host = this.hostname + portStr;
      return this;
    }
  }, {
    key: 'protocol',
    get: function get() {
      return this._getRawDataItem('protocol');
    },
    set: function set(protocol) {
      if (!validProtocols.hasOwnProperty(protocol)) {
        throw new Error('invalid protocol: ' + protocol); // TODO: test this
      }
      this._setRawDataItem('protocol', protocol);
    }

    /**
     * Getter/setter for host name. Does not incude port.
     */
  }, {
    key: 'hostname',
    get: function get() {
      return this._getRawDataItem('hostname');
    },
    set: function set(hostname) {
      if (!hostname) {
        throw new Error('invalid hostname: ' + hostname); // TODO: test this
      }
      this._setRawDataItem('hostname', hostname);
    }

    /**
     * Getter/setter for port.
     */
  }, {
    key: 'port',
    get: function get() {
      return this._getRawDataItem('port');
    },
    set: function set(port) {
      if (port === undefined) {
        this._setRawDataItem('port', undefined);
      } else {
        var parsedPort = parseInt(port);
        if (!parsedPort) {
          throw new Error('invalid port: ' + port); // TODO: test this
        }
        this._setRawDataItem('port', parsedPort);
      }
    }

    /**
     * Getter/setter for HTTP method.
     */
  }, {
    key: 'method',
    get: function get() {
      return this._getRawDataItem('method');
    },
    set: function set(method) {
      if (!method) {
        throw new Error('invalid method'); // TODO: test this
      }
      this._setRawDataItem('method', method.toUpperCase());
    }

    /**
     * Getter/setter for URL. Root-relative.
     */
  }, {
    key: 'url',
    get: function get() {
      return this._getRawDataItem('url');
    },
    set: function set(aUrl) {
      if (!/^\//.test(aUrl)) {
        throw new Error('invalid url, must start with /'); // TODO: test this
      }
      this._setRawDataItem('url', aUrl);
    }

    /**
     * Getter/setter for URL. Root-relative.
     */
  }, {
    key: 'query',
    get: function get() {
      var aUrl = this._getRawDataItem('url');
      var pUrl = _url2['default'].parse(aUrl, true);
      return pUrl.query || {};
    },
    set: function set(params) {
      (0, _assert2['default'])(typeof params === 'object', 'params not an object');
      var aUrl = this._getRawDataItem('url');
      var pUrl = _url2['default'].parse(aUrl, true);
      var search = _querystring2['default'].stringify(params);
      pUrl.search = search;
      aUrl = _url2['default'].format(pUrl);
      this._setRawDataItem('url', aUrl);
    }

    /**
     * Getter/setter for HTTP request header object.
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

  return Request;
})(_body2['default']);

exports['default'] = Request;
module.exports = exports['default'];