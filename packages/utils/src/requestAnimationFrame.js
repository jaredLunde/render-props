export const cancelAnimationFrame = (
  window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame
).bind(window)

export default (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame
).bind(window)
