export default function strictShallowEqual(objA, objB) {
  var aKeys = Object.keys(objA)

  if (aKeys.length !== Object.keys(objB).length) {
    return false
  }

  for (var x = 0; x < aKeys.length; x++) {
    var key = aKeys[x]

    if (objA[key] !== objB[key]) {
      return false
    }
  }

  return true
}
