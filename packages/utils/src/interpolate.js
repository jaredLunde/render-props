import perf from './perf'
import requestAnimationFrame from './requestAnimationFrame'


export function linear (pos) {
  return pos
}


function calcPosition (from, to, t) {
  return from + ((to - from) * t)
}


export default function interpolate (
  fn,
  {
    from = 0,
    to = 1,
    duration = 240,
    timing = linear
  }
) {
  const time = perf.now() + duration

  function loop () {
    const p = perf.now() / time

    if (p <= 1) {
      const t = timing(p)
      requestAnimationFrame(loop)
      let output

      if (typeof from === 'object') {
        output = {}

        for (let key in from) {
          output[key] = calcPosition(from[key], to[key], t)
        }
      }
      else {
        output = calcPosition(from, to, t)
      }

      fn(output)
    }
  }

  loop()
}
