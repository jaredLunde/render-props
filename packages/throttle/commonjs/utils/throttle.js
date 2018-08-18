"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = throttle;

var _requestAnimationFrame = _interopRequireWildcard(require("@render-props/utils/es/requestAnimationFrame"));

function throttle(cb) {
  var frame;

  function later(thisArg, args) {
    return function () {
      frame = void 0;
      cb.apply(thisArg, args);
    };
  }

  function throttled() {
    if (frame === void 0) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      frame = (0, _requestAnimationFrame.default)(later(this, args));
    }
  }

  throttled.cancel = function () {
    if (frame !== void 0) {
      (0, _requestAnimationFrame.cancelAnimationFrame)(frame);
    }
  };

  return throttled;
}