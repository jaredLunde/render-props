import raf, {cancel} from 'raf'


export default cb => {
  let frame

  function later (thisArg, args) {
    return function () {
      frame = void 0
      cb.apply(thisArg, args)
    }
  }

  function throttled (...args) {
    if (frame === void 0) {
      frame = raf(later(this, args))
    }
  }

  throttled.cancel = function () {
    if (frame !== void 0) {
      cancel(frame)
    }
  }

  return throttled
}
