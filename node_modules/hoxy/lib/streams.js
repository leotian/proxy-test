/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bufferReader = require('./buffer-reader');

var _bufferReader2 = _interopRequireDefault(_bufferReader);

var _streamThrottle = require('stream-throttle');

//import brake from 'brake'
//import Throttle from 'throttle'

exports['default'] = {

  /*
   * Wrap an array of buffers as a readable stream.
   */
  from: function from(buffer) {
    return new _bufferReader2['default'](buffer);
  },

  /*
   * Create a transform stream that simply slows the throughput.
   */
  brake: function brake(rate) {
    return new _streamThrottle.Throttle({ rate: rate });
    //return brake(rate)
    //return new Throttle({ bps: rate, chunkSize: 1024, highWaterMark: 500 })
  },

  /*
   * Get a series of buffers from a stream.
   */
  collect: function collect(readable, encoding) {
    return new _Promise(function (resolve, reject) {
      var buffers = [];
      readable.on('error', reject);
      readable.on('data', function (buffer) {
        buffers.push(buffer);
      });
      readable.on('end', function () {
        var finalBuffer = Buffer.concat(buffers);
        resolve(encoding ? finalBuffer.toString(encoding) : finalBuffer);
      });
    });
  }
};
module.exports = exports['default'];