import React from 'react'
import PropTypes from 'prop-types'
import {rect} from '@render-props/rect'
import {win} from './statics'
import {getRect} from './utils'


const _rects = (el, container, leeway) => ([
  rect(el, leeway),
  container === win ? getRect() : rect(container)
])


export function inViewX (el, container, leeway) {
  const [r, c] = _rects(el, container, leeway)
  return r !== void 0 && r.right > 0 && r.left < c.width
}

export function inViewY (el, container, leeway) {
  const [r, c] = _rects(el, container, leeway)
  return r !== void 0 && r.bottom > 0 && r.top < c.height
}

export function inView (el, container, leeway) {
  const [r, c] = _rects(el, container, leeway)
  return r !== void 0 &&
         r.bottom > 0 &&
         r.top < c.height &&
         r.right > 0 &&
         r.left < c.width
}

export function inFullViewX (el, container, leeway) {
  const [r, c] = _rects(el, container, leeway)
  if (r === void 0 || c === void 0) return false;

  return c.width - r.width >= 0 &&
         r.left >= c.left &&
         r.right <= c.right
}

export function inFullViewY (el, container, leeway) {
  const [r, c] = _rects(el, container, leeway)
  if (r === void 0 || c === void 0) return false;

  return c.height - r.height >= 0 &&
         r.top >= c.top &&
         r.bottom <= c.bottom
}

export function inFullView (el, container, leeway) {
  const [r, c] = _rects(el, container, leeway)
  if (r === void 0 || c === void 0) return false;

  return c.width - r.width >= 0 &&
         c.height - r.height >= 0 &&
         r.left >= c.left &&
         r.right <= c.right &&
         r.top >= c.top &&
         r.bottom <= c.bottom
}


export const viewportQueriesContext = {
  inViewX: (el, leeway) => inViewX(el, win, leeway),
  inViewY: (el, leeway) => inViewY(el, win, leeway),
  inView: (el, leeway) => inView(el, win, leeway),
  inFullViewX: (el, leeway) => inFullViewX(el, win, leeway),
  inFullViewY: (el, leeway) => inFullViewY(el, win, leeway),
  inFullView: (el, leeway) => inFullView(el, win, leeway),
}


export default function ViewportQueries (props) {
  return props.children(viewportQueriesContext)
}


ViewportQueries.propTypes = {
  children: PropTypes.func.isRequired,
}
