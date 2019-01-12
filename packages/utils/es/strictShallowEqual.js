import _Object$keys from '@babel/runtime-corejs2/core-js/object/keys'
export default function strictShallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }

  var aKeys = _Object$keys(objA)

  if (aKeys.length !== _Object$keys(objB).length) {
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
