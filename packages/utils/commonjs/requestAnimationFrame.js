'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = exports.cancelAnimationFrame = void 0

var _raf = _interopRequireWildcard(require('raf'))

var cancelAnimationFrame = _raf.cancel
exports.cancelAnimationFrame = cancelAnimationFrame
var _default = _raf.default
exports.default = _default
