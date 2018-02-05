import _Object$assign from "@babel/runtime/core-js/object/assign";
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
  return this.props.children(_Object$assign({
    throttleState: this.throttleState
  }, this.state));
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