"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _throttle = _interopRequireDefault(require("./utils/throttle"));

/**
import Throttle from '@render-props/throttle'


function ThrottledBodyScroller () {
  return (
    <Throttle initialState={{scrollY: 0, gt30: false}}>
      {({throttleState, state}) => (
        <body
          onScroll={
            e => throttleState(
              prevState => (
                window.scrollY > 30
                ? {gt30: true, scrollY: window.scrollY}
                : {gt30: false, scrollY: window.scrollY}
              )
            )
          }
        >
          Greater than 30? {String(state.gt30)}
        </body>
      )}
    </Throttle>
  )
}
*/
var emptyObj = {};

function _componentWillUnmount() {
  this.throttleState.cancel();
}

function _render() {
  // It's ok to mutate this
  this.throttleContext.state = this.state;
  return this.props.children(this.throttleContext);
}

var Throttle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Throttle, _React$Component);

  function Throttle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this._setState = function () {
      var _this2;

      return (_this2 = _this).setState.apply(_this2, arguments);
    };

    _this.state = props.initialState || emptyObj;
    _this.throttleState = (0, _throttle.default)(_this._setState);
    _this.throttleContext = {
      throttleState: _this.throttleState,
      state: _this.state
    };
    return _this;
  }

  var _proto = Throttle.prototype;
  _proto.componentWillUnmount = _componentWillUnmount;
  _proto.render = _render;
  return Throttle;
}(_react.default.Component);

exports.default = Throttle;