import React from 'react'
import PropTypes from 'prop-types'
import {rect} from '@render-props/rect'
import {win} from './statics'
import {getRect} from './utils'


const _rects = (el, leeway, container = win) => ([
  rect(el, leeway),
  container === win ? getRect() : rect(container)
])


export const inViewX = (el, leeway, container) => {
  const [r, c] = _rects(el, leeway, container)
  return r !== void 0 && r.right > 0 && r.left < c.width
}

export const inViewY = (el, leeway, container) => {
  const [r, c] = _rects(el, leeway, container)
  return r !== void 0 && r.bottom > 0 && r.top < c.height
}

export const inView = (el, leeway, container) => {
  const [r, c] = _rects(el, leeway, container)
  return r !== void 0 &&
         r.bottom > 0 &&
         r.top < c.height &&
         r.right > 0 &&
         r.left < c.width
}

export const inFullViewX = (el, leeway, container) => {
  const [r, c] = _rects(el, leeway, container)
  if (r === void 0 || c === void 0) return false;

  return c.width - r.width >= 0 &&
         r.left >= c.left &&
         r.right <= c.right
}

export const inFullViewY = (el, leeway, container) => {
  const [r, c] = _rects(el, leeway, container)
  if (r === void 0 || c === void 0) return false;

  return c.height - r.height >= 0 &&
         r.top >= c.top &&
         r.bottom <= c.bottom
}

export const inFullView = (el, leeway, container) => {
  const [r, c] = _rects(el, leeway, container)
  if (r === void 0 || c === void 0) return false;

  return c.width - r.width >= 0 &&
         c.height - r.height >= 0 &&
         r.left >= c.left &&
         r.right <= c.right &&
         r.top >= c.top &&
         r.bottom <= c.bottom
}


export const viewportQueriesContext = {
  inViewX: (el, leeway) => inViewX(el, leeway),
  inViewY: (el, leeway) => inViewY(el, leeway),
  inView: (el, leeway) => inView(el, leeway),
  inFullViewX: (el, leeway) => inFullViewX(el, leeway),
  inFullViewY: (el, leeway) => inFullViewY(el, leeway),
  inFullView: (el, leeway) => inFullView(el, leeway),
}


export default function ViewportQueries (props) {
  return props.children(viewportQueriesContext)
}


ViewportQueries.propTypes = {
  children: PropTypes.func.isRequired,
}
