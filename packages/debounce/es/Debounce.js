import _Object$getPrototypeOf from "@babel/runtime/core-js/object/get-prototype-of";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from './utils';
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
    this.debounceState = debounce(this._setState, this.props.wait, {
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
  _inherits(Debounce, _React$Component);

  function Debounce(props) {
    var _this;

    _classCallCheck(this, Debounce);

    _this = _possibleConstructorReturn(this, (Debounce.__proto__ || _Object$getPrototypeOf(Debounce)).call(this, props));
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
    _this.debounceState = debounce(_this._setState, props.wait, {
      leading: props.leading,
      trailing: props.trailing,
      maxWait: props.maxWait
    });
    _this.debounceContext = {
      debounceState: _this.debounceState
    };
    return _this;
  }

  _createClass(Debounce, [{
    key: "componentDidUpdate",
    value: _componentDidUpdate
  }, {
    key: "componentWillUnmount",
    value: _componentWillUnmount
  }, {
    key: "render",
    value: _render
  }]);

  return Debounce;
}(React.Component);

Object.defineProperty(Debounce, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    wait: 100
  }
});
export { Debounce as default };