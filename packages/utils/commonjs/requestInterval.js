'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.clearRequestInterval = clearRequestInterval
exports.default = requestInterval

var _requestAnimationFrame = _interopRequireWildcard(
  require('./requestAnimationFrame')
)

var _perf = _interopRequireDefault(require('./perf'))

/**  Copyright 2011, Joe Lambert.
 **  Free to use under the MIT license.
 **  http://www.opensource.org/licenses/mit-license.php
 **/
function clearRequestInterval(handle) {
  _requestAnimationFrame.cancelAnimationFrame
    ? (0, _requestAnimationFrame.cancelAnimationFrame)(handle.value)
    : window.clearInterval(handle)
}

function requestInterval(fn, delay) {
  if (!_requestAnimationFrame.default) {
    return window.setInterval(fn, delay)
  }

  var start = _perf.default.now()

  var handle = {}

  function loop() {
    var current = _perf.default.now(),
      delta = current - start

    if (delta >= delay) {
      fn.call()
      start = _perf.default.now()
    }

    handle.value = (0, _requestAnimationFrame.default)(loop)
  }

  handle.value = (0, _requestAnimationFrame.default)(loop)
  return handle
}
