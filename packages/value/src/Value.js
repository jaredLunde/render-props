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
  function maybeSetValue_ (prevState, props) {
    if (props.hasOwnProperty('value') === false) {
      if (typeof value === 'function') {
        value = value(prevState, props)
      }

      if (prevState.value === value) {
        return null
      }

      return {value}
    }

    if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
      throw new Error(
        `[Value] You called 'setValue', 'resetValue' or 'clearValue' on a ` +
        `controlled component. Did you mean to set 'initialValue' instead of ` +
        `'value'?`
      )
    }

    return null
  }

  return maybeSetValue_
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
    const {initialValue, value, propName} = props
    this.state = {value: value || initialValue}
    this.valueContext = {
      setValue: this.setValue,
      resetValue: this.resetValue,
      clearValue: this.clearValue,
      value: this.state.value
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      nextProps.hasOwnProperty('value') === false
      || nextProps.value === prevState.value
    ) {
      return null
    }

    return {value: nextProps.value}
  }

  componentDidUpdate (_, {value}) {
    if (value !== this.state.value) {
      callIfExists(this.props.onChange, value)
    }
  }

  setValue = value => this.setState(maybeSetValue(value))
  resetValue = () => this.setState(maybeSetValue(this.props.initialValue))
  clearValue = value => this.setState(maybeSetValue(void 0))

  render () {
    this.valueContext.value = this.state.value
    /** value, setValue, resetValue, clearValue */
    return this.props.children(this.valueContext)
  }
}
