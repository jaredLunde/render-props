import React from 'react'


export const observe = {
  SCROLL: 0b1, // 1
  SIZE: 0b1010, // 10
  ANY: 0b1011 // 11
}

function calculateChangedBits (prevValue, nextValue) {
  if (
    prevValue.scrollY !== nextValue.scrollY
    || prevValue.scrollX !== nextValue.scrollX
  ) {
    return observe.SCROLL
  }
  else if (prevValue.aspect !== nextValue.aspect) {
    return observe.SIZE
  }

  return observe.ANY
}


export default React.createContext(
  {
    width: null,
    height: null,
    aspect: null,
    orientation: null,
    screenOrientation: null,
    scrollX: null,
    scrollY: null,
    scrollTo: null,
    inView: null,
    inViewX: null,
    inViewY: null,
    inFullView: null,
    inFullViewX: null,
    inFullViewY: null,
  },
  calculateChangedBits
)
