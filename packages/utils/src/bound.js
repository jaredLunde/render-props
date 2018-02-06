import callIfExists from './callIfExists'


export default function ({
  value,
  lower,
  upper,
  outOfUpper,
  outOfLower,
  inBounds,
  cast = parseInt
}) {
  value = cast(value)
  lower = cast(lower)
  upper = cast(upper)
  inBounds = inBounds || (() => {})

  if (isNaN(value)) {
    return inBounds()
  }

  if (!isNaN(upper) && value > upper) {
    // Out of upper boundary
    return callIfExists(outOfUpper)
  } else if (!isNaN(lower) && value < lower) {
    // Out of lower boundary
    return callIfExists(outOfLower)
  }

  return inBounds()
}
