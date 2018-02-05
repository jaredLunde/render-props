import requestAnimationFrame, {cancelAnimationFrame} from './requestAnimationFrame'
import perf from './perf'


/**  Copyright 2011, Joe Lambert.
 **  Free to use under the MIT license.
 **  http://www.opensource.org/licenses/mit-license.php
 **/
export function clearRequestInterval (handle) {
  cancelAnimationFrame
  ? cancelAnimationFrame(handle.value)
  : window.clearInterval(handle)
}


export default function (fn, delay) {
  if (!requestAnimationFrame) {
    return window.setInterval(fn, delay)
  }

  var start = perf.now(),
      handle = new Object()

  function loop() {
    var current = perf.now(),
        delta = current - start

    if(delta >= delay) {
      fn.call()
      start = perf.now()
    }

    handle.value = requestAnimationFrame(loop)
  }

  handle.value = requestAnimationFrame(loop)
  return handle
}
