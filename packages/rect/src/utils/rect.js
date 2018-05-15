export default function (el, pad) {
  el = el && !el.nodeType ? el[0] : el

  if (!el || 1 !== el.nodeType) {
    return
  }

  const rect = el.getBoundingClientRect()

  if (pad === void 0 || pad === null) {
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  }

  pad = (
    typeof pad === 'object'
      ? pad
      : {top: pad, right: pad, bottom: pad, left: pad}
  )

  pad.top = pad.top || 0
  pad.right = pad.right || 0
  pad.bottom = pad.bottom || 0
  pad.left = pad.left || 0

  return {
    top: pad.top + rect.top,
    right: pad.right + rect.right,
    bottom: pad.bottom + rect.bottom,
    left: pad.left + rect.left,
    width: pad.left + pad.right + rect.width,
    height: pad.top + pad.bottom + rect.height,
  }
}
