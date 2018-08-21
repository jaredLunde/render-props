import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
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
  _inheritsLoose(Throttle, _React$Component);

  function Throttle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this._setState = function () {
      var _this2;

      return (_this2 = _this).setState.apply(_this2, arguments);
    };

    _this.state = props.initialState || emptyObj;
    _this.throttleState = throttle(_this._setState);
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
}(React.Component);

export { Throttle as default };