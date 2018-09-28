/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

  chunksToString: function chunksToString(chunks, encoding) {
    encoding = encoding || 'utf8';
    chunks = chunks.map(function (chunk) {
      return chunk.toString(encoding);
    });
    return chunks.join('');
  },

  stringToChunks: function stringToChunks(str, encoding) {
    return [new Buffer(str, encoding || 'utf8')];
  }
};
module.exports = exports['default'];