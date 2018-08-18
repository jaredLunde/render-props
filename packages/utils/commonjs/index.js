'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.toKebabCaseTrimmed = exports.clearRequestTimeout = exports.clearRequestInterval = exports.cancelAnimationFrame = void 0

var _bound2 = _interopRequireDefault(require('./bound'))

exports.bound = _bound2.default

var _callIfExists2 = _interopRequireDefault(require('./callIfExists'))

exports.callIfExists = _callIfExists2.default

var _interpolate2 = _interopRequireDefault(require('./interpolate'))

exports.interpolate = _interpolate2.default

var _perf2 = _interopRequireDefault(require('./perf'))

exports.perf = _perf2.default

var _requestAnimationFrame2 = _interopRequireWildcard(
  require('./requestAnimationFrame')
)

exports.requestAnimationFrame = _requestAnimationFrame2.default
exports.cancelAnimationFrame = _requestAnimationFrame2.cancelAnimationFrame

var _requestInterval2 = _interopRequireWildcard(require('./requestInterval'))

exports.requestInterval = _requestInterval2.default
exports.clearRequestInterval = _requestInterval2.clearRequestInterval

var _requestTimeout2 = _interopRequireWildcard(require('./requestTimeout'))

exports.requestTimeout = _requestTimeout2.default
exports.clearRequestTimeout = _requestTimeout2.clearRequestTimeout

var _strictShallowEqual2 = _interopRequireDefault(
  require('./strictShallowEqual')
)

exports.strictShallowEqual = _strictShallowEqual2.default

var _toKebabCase2 = _interopRequireWildcard(require('./toKebabCase'))

exports.toKebabCase = _toKebabCase2.default
exports.toKebabCaseTrimmed = _toKebabCase2.toKebabCaseTrimmed
