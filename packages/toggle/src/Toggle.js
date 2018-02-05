import React from 'react'
import PropTypes from 'prop-types'


export const toggle = (state, {controls, propName}) => {
  const controlValue = controls[0].value
  return (
    controlValue !== state[propName]
    ? {[propName]: controlValue}
    : {[propName]: controls[controls.length - 1].value}
  )
}


function Toggler (props) {
  return props.children({
    on: function () {
      props.setValue(props.onValue)
    },
    off: function () {
      props.setValue(props.offValue)
    },
    toggle: function () {
      props.setValue(
        function (prevState) {
          return prevState.value === props.onValue ? props.offValue : props.onValue
        }
      )
    },
    reset: function () {
      props.resetValue()
    },
    value
  })
}


export default function Toggle (props) {
  const onValue = props.hasOwnProperty('onValue') === false ? true : props.onValue
  const offValue = props.hasOwnProperty('offValue') === false ? true : props.offValue

  const initialValue = (
    props.hasOwnProperty('value') === false
      ? props.initialValue || onValue
      : void 0
  )

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    if (
      initialValue !== onValue
      && initialValue !== offValue
      && props.value !== onValue
      && props.value !== offValue
    ) {
      throw new Error(
        `[Toggle] The initial value did not match onValue or offValue: ` +
        `${initialValue === void 0 ? value : initialValue} not in [${onValue}, ${offValue}]`
      )
    }
  }

  return (
    <Value
      initialValue={initialValue}
      value={props.value}
      onChange={props.onChange}
    >
      {function (valueContext) {
        return Toggler({
          onValue: props.onValue,
          offValue: props.offValue,
          ...valueContext
        })
      }}
    </Value>
  )
}


Toggle.propTypes = {
  children: PropTypes.func.isRequired,
  onValue: PropTypes.any,
  offValue: PropTypes.any,
  value: PropTypes.any
}
