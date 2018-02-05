"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cancelAnimationFrame = void 0;
var cancelAnimationFrame = (window.cancelAnimationFrame || window.mozCancelAnimationFrame).bind(window);
exports.cancelAnimationFrame = cancelAnimationFrame;

var _default = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame).bind(window);

exports.default = _default;