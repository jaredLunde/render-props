"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = strictShallowEqual;

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

function strictShallowEqual(objA, objB) {
  var aKeys = (0, _keys.default)(objA);

  if (aKeys.length !== (0, _keys.default)(objB).length) {
    return false;
  }

  for (var x = 0; x < aKeys.length; x++) {
    var key = aKeys[x];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}