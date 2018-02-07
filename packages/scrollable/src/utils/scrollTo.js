import interpolate from '@render-props/utils/es/interpolate'


export default function scrollTo (element, from, to, {duration, timing}) {
  const scroller = (
    element === window
    ? window.scrollTo.bind(window)
    : function (x, y) {
        element.scrollTop = y
        element.scrollLeft = x
      }
  )

  interpolate(
    function (values) {
      scroller(values.x, values.y)
    },
    {
      from,
      to,
      duration,
      timing
    }
  )
}
