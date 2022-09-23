"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/styles");

var _useMediaQuery = _interopRequireDefault(require("@material-ui/core/useMediaQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  var theme = (0, _styles.useTheme)();
  var isXs = (0, _useMediaQuery["default"])(theme.breakpoints.up('xs'));
  var isSm = (0, _useMediaQuery["default"])(theme.breakpoints.up('sm'));
  var isMd = (0, _useMediaQuery["default"])(theme.breakpoints.up('md'));
  var isLg = (0, _useMediaQuery["default"])(theme.breakpoints.up('lg'));
  var isXl = (0, _useMediaQuery["default"])(theme.breakpoints.up('xl'));
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  if (isXs) return 'xs';
  return null;
}

var _default = useWidth;
exports["default"] = _default;