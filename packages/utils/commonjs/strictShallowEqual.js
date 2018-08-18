'use strict'

exports.__esModule = true
exports.default = strictShallowEqual

require('core-js/modules/web.dom.iterable')

require('core-js/modules/es6.array.iterator')

require('core-js/modules/es6.object.keys')

function strictShallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }

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
