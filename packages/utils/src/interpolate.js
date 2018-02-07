import perf from './perf'
import requestAnimationFrame from './requestAnimationFrame'


export function linear (pos) {
  return pos
}


function calcPosition (from, to, t) {
  return from + ((to - from) * t)
}


function calcObjOrInt (from, to, t) {
  let output

  if (typeof from === 'object') {
    output = Array.isArray(from) ? [] : {}

    for (let key in from) {
      output[key] = calcPosition(from[key], to[key], t)
    }
  }
  else {
    output = calcPosition(from, to, t)
  }

  return output
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
  const start = perf.now()
  const time = start + duration

  function loop () {
    const p = 1 - ((time - perf.now()) / (time - start))
    const t = timing(p)

    if (p <= 1) {
      requestAnimationFrame(loop)
      fn(calcObjOrInt(from, to, t))
    }
    else {
      fn(calcObjOrInt(from, to, t > 1 ? 1 :  t))
    }
  }

  loop()
}
