"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(items, value) {
  return items.some(function (item) {
    return item === value;
  });
};

exports["default"] = _default;