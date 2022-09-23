"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _styles = require("@material-ui/core/styles");

var _createGetScreenValue = _interopRequireDefault(require("../utils/createGetScreenValue"));

var _useConfig = _interopRequireDefault(require("./useConfig"));

var _useWidth = _interopRequireDefault(require("./useWidth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(config) {
  var defaultConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // if no config passed from params, use context instead.
  var context = config || (0, _useConfig["default"])();

  var _useTheme = (0, _styles.useTheme)(),
      keys = _useTheme.breakpoints.keys;

  var currentScreen = (0, _useWidth["default"])();
  var contextKeys = Object.keys(context);
  var getScreenValue = (0, _createGetScreenValue["default"])(keys, currentScreen);

  var assignValue = function assignValue() {
    var screenContext = {}; // eslint-disable-next-line no-plusplus

    for (var i = 0; i < contextKeys.length; i++) {
      var key = contextKeys[i];
      screenContext[key] = getScreenValue(context[key], defaultConfig[key]);
    }

    return screenContext;
  };

  return (0, _react.useMemo)(assignValue, [context, currentScreen]);
};

exports["default"] = _default;