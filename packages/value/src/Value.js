import React from 'react'
import PropTypes from 'prop-types'
import callIfExists from '@render-props/utils/es/callIfExists'


/**
import Value from '@render-props/value'

function ValueSetter () {
  return (
    <Value initialValue='foo'>
      {({setValue, clearValue, resetValue, value}) => (
        <>
          <button onClick={() => setValue(value === 'foo' ? 'bar' : 'foo')}>
            Change value to '{value === 'foo' ? 'bar' : 'foo'}'
          </button>

          <button onClick={clearValue}>
            Make value 'undefined'
          </button>

          <button onClick={resetValue}>
            Reset value to initialValue
          </button>
        </>
      )}
    </Value>
  )
}
*/


function maybeSetValue (value) {
  return function (prevState, props) {
    if (props.value === void 0) {
      let nextValue = value

      if (typeof value === 'function') {
        nextValue = value(prevState.value, props)
      }

      if (prevState.value === nextValue) {
        return null
      }

      return {value: nextValue}
    }

    if (__DEV__) {
      throw new Error(
        `[Value] You called 'setValue', 'resetValue' or 'clearValue' on a ` +
        `controlled component. Did you mean to set 'initialValue' instead of ` +
        `'value'?`
      )
    }

    return null
  }
}


export default class Value extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    initialValue: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {value: props.value === void 0 ? props.initialValue : props.value}
    this.valueContext = {
      setValue: this.setValue,
      resetValue: this.resetValue,
      clearValue: this.clearValue
    }
  }

  componentDidUpdate (_, {value}) {
    if (value !== this.state.value) {
      callIfExists(this.props.onChange, this.state.value)
    }

    if (
      this.props.value !== void 0
      && this.props.value !== this.state.value
    ) {
      this.setState({value: this.props.value})
    }
  }

  setValue = value => this.setState(maybeSetValue(value))
  resetValue = () => this.setState(maybeSetValue(this.props.initialValue))
  clearValue = () => this.setState(maybeSetValue(void 0))

  render () {
    this.valueContext.value = this.state.value
    /** value, setValue, resetValue, clearValue */
    return this.props.children(this.valueContext)
  }
}
