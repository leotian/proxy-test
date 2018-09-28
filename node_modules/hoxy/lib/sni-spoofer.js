/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _uglyAdapter = require('ugly-adapter');

var _uglyAdapter2 = _interopRequireDefault(_uglyAdapter);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _pem = require('pem');

var _pem2 = _interopRequireDefault(_pem);

var _tls = require('tls');

var _tls2 = _interopRequireDefault(_tls);

var _events = require('events');

var SNISpoofer = (function (_EventEmitter) {
  _inherits(SNISpoofer, _EventEmitter);

  function SNISpoofer(rootKey, rootCert) {
    _classCallCheck(this, SNISpoofer);

    _get(Object.getPrototypeOf(SNISpoofer.prototype), 'constructor', this).call(this);
    this._rootKey = rootKey;
    this._rootCert = rootCert;
    this._cache = new _Map();
  }

  _createClass(SNISpoofer, [{
    key: 'callback',
    value: function callback() {

      var cache = this._cache,
          rootKey = this._rootKey,
          rootCert = this._rootCert,
          _this = this;

      var getCachedCtx = _co2['default'].wrap(_regeneratorRuntime.mark(function callee$2$0(serverName) {
        var ctx;
        return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              ctx = cache.get(serverName);

              if (!ctx) {
                ctx = getCtx(serverName);
                cache.set(serverName, ctx);
              }
              context$3$0.next = 4;
              return ctx;

            case 4:
              return context$3$0.abrupt('return', context$3$0.sent);

            case 5:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));

      var getCtx = _co2['default'].wrap(_regeneratorRuntime.mark(function callee$2$0(serverName) {
        var create, _ref, key, cert, ctx;

        return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              create = _uglyAdapter2['default'].part(_pem2['default'].createCertificate);
              context$3$0.next = 3;
              return create({
                country: 'US',
                state: 'Utah',
                locality: 'Provo',
                organization: 'ACME Tech Inc',
                commonName: serverName,
                altNames: [serverName],
                serviceKey: rootKey,
                serviceCertificate: rootCert,
                serial: Date.now(),
                days: 500
              });

            case 3:
              _ref = context$3$0.sent;
              key = _ref.clientKey;
              cert = _ref.certificate;
              ctx = _tls2['default'].createSecureContext({ key: key, cert: cert });

              _this.emit('generate', serverName);
              return context$3$0.abrupt('return', ctx);

            case 9:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));

      return function (serverName, cb) {
        getCachedCtx(serverName).then(function (ctx) {
          return cb(null, ctx);
        }, function (err) {
          _this.emit('error', err);
          cb(err);
        });
      };
    }
  }]);

  return SNISpoofer;
})(_events.EventEmitter);

exports.SNISpoofer = SNISpoofer;