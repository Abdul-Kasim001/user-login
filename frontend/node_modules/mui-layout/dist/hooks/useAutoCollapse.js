"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _core = require("@material-ui/core");

var _useConfig2 = _interopRequireDefault(require("./useConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var _useTheme = (0, _core.useTheme)(),
      keys = _useTheme.breakpoints.keys;

  var _useConfig = (0, _useConfig2["default"])(),
      collapsible = _useConfig.collapsible,
      screen = _useConfig.screen,
      collapsed = _useConfig.collapsed,
      setCollapsed = _useConfig.setCollapsed,
      collapsedBreakpoint = _useConfig.collapsedBreakpoint,
      autoCollapsedDisabled = _useConfig.autoCollapsedDisabled;

  (0, _react.useEffect)(function () {
    // skip everything if user disable this feature in config
    if (!autoCollapsedDisabled) {
      if (collapsible && screen) {
        if (collapsed && screen === collapsedBreakpoint) {
          setCollapsed(false);
        }

        if (!collapsed && keys.indexOf(screen) < keys.indexOf(collapsedBreakpoint)) {
          setCollapsed(true);
        }
      }
    }
  }, [screen]);

  if (autoCollapsedDisabled) {
    return null;
  }

  return true;
};

exports["default"] = _default;