import {requestTimeout, clearRequestTimeout} from '@render-props/utils'
/** Credit to lodash, all I did was switch to requestTimeout */

export default function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }

  wait = +wait || 0

  if (typeof options === 'object') {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis
    lastArgs = lastThis = void 0
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time // Start the timer for the trailing edge.

    if (timerId !== void 0) {
      clearRequestTimeout(timerId)
    }

    timerId = requestTimeout(timerExpired, wait) // Invoke the leading edge.

    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall
    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return (
      lastCallTime === void 0 ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()

    if (shouldInvoke(time)) {
      return trailingEdge(time)
    } // Restart the timer.

    if (timerId !== void 0) {
      clearRequestTimeout(timerId)
    }

    timerId = requestTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = void 0 // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }

    lastArgs = lastThis = void 0
    return result
  }

  function cancel() {
    if (timerId !== void 0) {
      clearRequestTimeout(timerId)
    }

    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = void 0
  }

  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== void 0
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)
    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime)
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        if (timerId !== void 0) {
          clearRequestTimeout(timerId)
        }

        timerId = requestTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }

    if (timerId === void 0) {
      timerId = requestTimeout(timerExpired, wait)
    }

    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}
