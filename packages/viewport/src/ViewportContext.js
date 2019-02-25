import React from 'react'


export var observe = {
  scrollX: 0b0001,
  scrollY: 0b0010,
  scroll: 0b0011,
  width: 0b0100,
  height: 0b1000,
  size: 0b1100,
  any: 0b1111,
  none: 0b10000
}

function calculateChangedBits (prevValue, nextValue) {
  let observedBits = 0

  if (prevValue.scrollY !== nextValue.scrollY) {
    observedBits =
      prevValue.scrollX !== nextValue.scrollX
      ? observe.scroll
      : observe.scrollY
  }
  else if (prevValue.scrollX !== nextValue.scrollX) {
    observedBits = observe.scrollX
  }

  if (prevValue.width !== nextValue.width) {
    observedBits =
      observedBits | prevValue.height !== nextValue.height
      ? observe.size
      : observe.width
  }
  else if (prevValue.height !== nextValue.height) {
    observedBits = observedBits | observe.height
  }

  if (observedBits === 0) {
    return observe.none
  }

  return observedBits
}


export default React.createContext({}, calculateChangedBits)
