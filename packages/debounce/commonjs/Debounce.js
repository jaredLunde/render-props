"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

/**
import Debounce from '@render-props/debounce'


function DebouncedBodyScroller () {
  return (
    <Debounce initialState={{scrollY: 0, gt30: false}}>
      {({debounceState, state}) => (
        <body
          onScroll={
            e => debounceState(
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
    </Debounce>
  )
}
*/
var emptyObj = {};

function _componentDidUpdate(_ref) {
  var leading = _ref.leading,
      trailing = _ref.trailing,
      maxWait = _ref.maxWait,
      wait = _ref.wait;

  if (leading !== this.props.leading || trailing !== this.props.trailing || maxWait !== this.props.maxWait || wait !== this.props.wait) {
    this.debounceState = (0, _utils.debounce)(this._setState, this.props.wait, {
      leading: this.props.leading,
      trailing: this.props.trailing,
      maxWait: this.props.maxWait
    });
  }
}

function _componentWillUnmount() {
  this.debounceState.cancel();
}

function _render() {
  this.debounceContext.state = this.state;
  return this.props.children(this.debounceContext);
}

var Debounce =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Debounce, _React$Component);

  function Debounce(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this._setState = function () {
      var _this2;

      return (_this2 = _this).setState.apply(_this2, arguments);
    };

    _this.state = props.initialState || emptyObj;
    _this.debounceState = (0, _utils.debounce)(_this._setState, props.wait, {
      leading: props.leading,
      trailing: props.trailing,
      maxWait: props.maxWait
    });
    _this.debounceContext = {
      debounceState: _this.debounceState
    };
    return _this;
  }

  var _proto = Debounce.prototype;
  _proto.componentDidUpdate = _componentDidUpdate;
  _proto.componentWillUnmount = _componentWillUnmount;
  _proto.render = _render;
  return Debounce;
}(_react.default.Component);

exports.default = Debounce;
Debounce.defaultProps = {
  wait: 100
};