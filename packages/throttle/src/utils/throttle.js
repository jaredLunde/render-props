import requestAnimationFrame, {cancelAnimationFrame} from '@render-props/utils/es/requestAnimationFrame'


export default function (cb) {
  let frame

  function later (thisArg, args) {
    return function () {
      frame = void 0
      cb.apply(thisArg, args)
    }
  }

  function throttled (...args) {
    if (frame === void 0) {
      frame = requestAnimationFrame(later(this, args))
    }
  }

  throttled.cancel = function () {
    if (frame !== void 0) {
      cancelAnimationFrame(frame)
    }
  }

  return throttled
}
