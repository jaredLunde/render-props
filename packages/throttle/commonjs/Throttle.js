"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _throttle = _interopRequireDefault(require("./utils/throttle"));

/**
<Throttle initialState={{scrollY: 0}}>
  {
    ({throttleState, scrollY}) => (
      <Scroller
        onScroll={
          ({scrollY}) => throttleState(
            prevState => scrollY > 30
              ? {gt30: true, scrollY}
              : {gt30: false, scrollY}
          )
        }
      >
        Greater than 30? {String(gt30)}
      </Scroller>
    )
  }
</Throttle>
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
  (0, _inherits2.default)(Throttle, _React$Component);

  function Throttle(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Throttle);
    _this = (0, _possibleConstructorReturn2.default)(this, (Throttle.__proto__ || (0, _getPrototypeOf.default)(Throttle)).call(this, props));
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "_setState", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var _this2;

        return (_this2 = _this).setState.apply(_this2, arguments);
      }
    });
    _this.state = props.initialState || emptyObj;
    _this.throttleState = (0, _throttle.default)(_this._setState);
    _this.throttleContext = {
      throttleState: _this.throttleState,
      state: _this.state
    };
    return _this;
  }

  (0, _createClass2.default)(Throttle, [{
    key: "componentWillUnmount",
    value: _componentWillUnmount
  }, {
    key: "render",
    value: _render
  }]);
  return Throttle;
}(_react.default.Component);

exports.default = Throttle;