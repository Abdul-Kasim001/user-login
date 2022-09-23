"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isPlainObject = _interopRequireDefault(require("./isPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createGetScreenValue = function createGetScreenValue(keys, currentScreen) {
  return function (value, defaultValue) {
    if (value !== null && value !== undefined) {
      if (!(0, _isPlainObject["default"])(value)) {
        return value;
      }

      var index = keys.indexOf(currentScreen);

      while (index >= 0) {
        if (value[keys[index]] !== undefined) {
          return value[keys[index]];
        }

        index -= 1;
      }
    }

    if (!defaultValue) return value;
    return createGetScreenValue(keys, currentScreen)(defaultValue);
  };
};

var _default = createGetScreenValue;
exports["default"] = _default;