import _Object$getPrototypeOf from "@babel/runtime/core-js/object/get-prototype-of";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import throttle from './utils/throttle';
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
  _inherits(Throttle, _React$Component);

  function Throttle(props) {
    var _this;

    _classCallCheck(this, Throttle);

    _this = _possibleConstructorReturn(this, (Throttle.__proto__ || _Object$getPrototypeOf(Throttle)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "_setState", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var _this2;

        return (_this2 = _this).setState.apply(_this2, arguments);
      }
    });
    _this.state = props.initialState || emptyObj;
    _this.throttleState = throttle(_this._setState);
    _this.throttleContext = {
      throttleState: _this.throttleState,
      state: _this.state
    };
    return _this;
  }

  _createClass(Throttle, [{
    key: "componentWillUnmount",
    value: _componentWillUnmount
  }, {
    key: "render",
    value: _render
  }]);

  return Throttle;
}(React.Component);

export { Throttle as default };