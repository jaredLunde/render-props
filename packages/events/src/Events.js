import React from 'react'
import PropTypes from 'prop-types'


export default class Events extends React.Component {
  static propTypes = {
    children: PropTypes.function.isRequired,
  }
  listeners = []

  constructor (props) {
    super(props)
    this.renderProps = {
      addEvent: this.addEvent,
      removeEvent: this.removeEvent,
      removeAllEvents: this.removeAllEvents
    }
  }

  addEvent = (el, name, fn) => {
    this.listeners.push([el, name, fn])
    el.addEventListener(name, fn)
  }

  removeEvent = (el, name, fn) => {
    el.removeEventListener(name, fn)

    for (let x = 0; x < this.listeners.length; x++) {
      const event = this.listeners[x]
      const [el_, name_, fn_] = event

      if (el === el_ && name === name_ && fn === fn_) {
        this.listeners.splice(x, 1)
      }
    }
  }

  removeAllEvents = el => {
    for (let x = 0; x < this.listeners.length; x++) {
      const [el_, name, fn] = this.listeners[x]
      if (!el || el_ === el) {
        el_.removeEventListener(name, fn)
        this.listeners.splice(x, 1)
      }
    }
  }

  componentWillUnmount () {
    this.removeAllEvents()
  }

  render () {
    return this.props.children(this.renderProps)
  }
}
