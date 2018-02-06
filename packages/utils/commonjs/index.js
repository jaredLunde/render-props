"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "callIfExists", {
  enumerable: true,
  get: function get() {
    return _callIfExists2.default;
  }
});
Object.defineProperty(exports, "perf", {
  enumerable: true,
  get: function get() {
    return _perf2.default;
  }
});
Object.defineProperty(exports, "requestAnimationFrame", {
  enumerable: true,
  get: function get() {
    return _requestAnimationFrame2.default;
  }
});
Object.defineProperty(exports, "cancelAnimationFrame", {
  enumerable: true,
  get: function get() {
    return _requestAnimationFrame2.cancelAnimationFrame;
  }
});
Object.defineProperty(exports, "requestInterval", {
  enumerable: true,
  get: function get() {
    return _requestInterval2.default;
  }
});
Object.defineProperty(exports, "clearRequestInterval", {
  enumerable: true,
  get: function get() {
    return _requestInterval2.clearRequestInterval;
  }
});
Object.defineProperty(exports, "requestTimeout", {
  enumerable: true,
  get: function get() {
    return _requestTimeout2.default;
  }
});
Object.defineProperty(exports, "clearRequestTimeout", {
  enumerable: true,
  get: function get() {
    return _requestTimeout2.clearRequestTimeout;
  }
});
Object.defineProperty(exports, "strictShallowEqual", {
  enumerable: true,
  get: function get() {
    return _strictShallowEqual2.default;
  }
});

var _callIfExists2 = _interopRequireDefault(require("./callIfExists"));

var _perf2 = _interopRequireDefault(require("./perf"));

var _requestAnimationFrame2 = _interopRequireWildcard(require("./requestAnimationFrame"));

var _requestInterval2 = _interopRequireWildcard(require("./requestInterval"));

var _requestTimeout2 = _interopRequireWildcard(require("./requestTimeout"));

var _strictShallowEqual2 = _interopRequireDefault(require("./strictShallowEqual"));