import {interpolate} from '@render-props/utils'


export default function scrollTo (element, from, to, {duration, timing}) {
  const scroller = (
    element === window
    ? window.scrollTo
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
