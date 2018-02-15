import React from 'react'
import PropTypes from 'prop-types'
import Value from '@render-props/value'

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


export default function Toggle (props) {
  const onValue = props.onValue === void 0 ? true : props.onValue
  const offValue = props.offValue === void 0 ? false : props.offValue

  const initialValue = (
    props.value === void 0
      ? (props.initialValue === void 0 ? onValue : props.initialValue)
      : void 0
  )

  if (__DEV__) {
    if (
      initialValue !== onValue
      && initialValue !== offValue
      && props.value !== onValue
      && props.value !== offValue
    ) {
      throw new Error(
        `[Toggle] The initial value did not match onValue or offValue: ` +
        `${initialValue === void 0 ? props.value : initialValue} not in [${onValue}, ${offValue}]`
      )
    }
  }

  function toggleValues (currentValue) {
    return currentValue === onValue ? offValue : onValue
  }

  return (
    <Value
      initialValue={initialValue}
      value={props.value}
      onChange={props.onChange}
    >
      {function ({value, setValue, resetValue}) {
        return props.children({
          value,
          on: () => setValue(onValue),
          off: () => setValue(offValue),
          toggle: () => setValue(toggleValues),
          reset: resetValue
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
