import React from 'react'
import PropTypes from 'prop-types'

/**
import Toggle from '@render-props/toggle'

function Toggler () {
  return (
    <Toggle
      initialValue={true}
      onValue={true}
      offValue={false}
    >
      {({on, off, toggle, reset, value}) => (
        <>
          <button onClick={toggle}>
            Toggle value to '{value === true ? 'false' : 'true'}'
          </button>

          <button onClick={on}>
            Toggle 'on'
          </button>

          <button onClick={off}>
            Toggle 'off'
          </button>

          <button onClick={reset}>
            Reset value to initialValue
          </button>
        </>
      )}
    </Toggle>
  )
}
*/

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
  value: PropTypes.any,
  initialValue: PropTypes.any
}
