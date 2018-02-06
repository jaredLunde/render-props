export default function strictShallowEqual (objA, objB) {
  const aKeys = Object.keys(objA)

  if (aKeys.length !== Object.keys(objB).length) {
    return false
  }

  for (let x = 0; x < aKeys.length; x++) {
    const key = aKeys[x]
    if (objA[key] !== objB[key]) {
      return false
    }
  }

  return true
}
