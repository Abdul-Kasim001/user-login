"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _this = void 0;

var get = function get(object, path, defaultVal) {
  var PATH = Array.isArray(path) ? path : path.split('.').filter(function (i) {
    return i.length;
  });

  if (!PATH.length) {
    return object === undefined ? defaultVal : object;
  }

  if (object === null || object === undefined || typeof object[PATH[0]] === 'undefined') {
    return defaultVal;
  }

  return _this.get(object[PATH.shift()], PATH, defaultVal);
};

var _default = get;
exports["default"] = _default;