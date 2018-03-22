import requestAnimationFrame, {
  cancelAnimationFrame,
} from './requestAnimationFrame'
import perf from './perf'
/**  Copyright 2011, Joe Lambert.
 **  Free to use under the MIT license.
 **  http://www.opensource.org/licenses/mit-license.php
 **/

export function clearRequestInterval(handle) {
  cancelAnimationFrame(handle.value)
}
export default function requestInterval(fn, delay) {
  var start = perf.now()
  var handle = {}

  function loop() {
    var current = perf.now()
    var delta = current - start

    if (delta >= delay) {
      fn.call()
      start = perf.now()
    }

    handle.value = requestAnimationFrame(loop)
  }

  handle.value = requestAnimationFrame(loop)
  return handle
}
