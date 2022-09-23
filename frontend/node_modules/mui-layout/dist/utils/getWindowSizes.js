"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getWindowSizes = function getWindowSizes() {
  var canUseDOM = typeof window !== 'undefined';
  return {
    width: canUseDOM ? window.innerWidth : null,
    height: canUseDOM ? window.innerHeight : null,
    canUseDOM: canUseDOM
  };
};

var _default = getWindowSizes;
exports["default"] = _default;