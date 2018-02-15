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


export default function requestInterval (fn, delay) {
  if (!requestAnimationFrame) {
    return window.setInterval(fn, delay)
  }

  let start = perf.now()
  let handle = {}

  function loop () {
    const current = perf.now()
    const delta = current - start

    if(delta >= delay) {
      fn.call()
      start = perf.now()
    }

    handle.value = requestAnimationFrame(loop)
  }

  handle.value = requestAnimationFrame(loop)
  return handle
}
