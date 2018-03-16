import React from 'react'


export var observe = {
  SCROLL_X: 0b0001,
  SCROLL_Y: 0b0010,
  SCROLL: 0b0011,
  WIDTH: 0b0100,
  HEIGHT: 0b1000,
  SIZE: 0b1100,
  ANY: 0b1111,
  NONE: 0b10000
}

function calculateChangedBits (prevValue, nextValue) {
  if (prevValue.scrollY !== nextValue.scrollY) {
    return prevValue.scrollX !== nextValue.scrollX ? observe.SCROLL : observe.SCROLL_Y
  }
  else if (prevValue.scrollX !== nextValue.scrollX) {
    return observe.SCROLL_X
  }
  else if (prevValue.width !== nextValue.width) {
    return prevValue.height !== nextValue.height ? observe.SIZE : observe.WIDTH
  }
  else if (prevValue.height !== nextValue.height) {
    return observe.HEIGHT
  }

  return observe.NONE
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
