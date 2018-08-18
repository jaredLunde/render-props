import { requestAnimationFrame, cancelAnimationFrame } from '@render-props/utils';
export default function throttle(cb) {
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

      frame = requestAnimationFrame(later(this, args));
    }
  }

  throttled.cancel = function () {
    if (frame !== void 0) {
      cancelAnimationFrame(frame);
    }
  };

  return throttled;
}