import React from 'react'


export default class Events extends React.Component {
  events = []

  constructor (props) {
    super(props)
    this.renderProps = {
      addEvent: this.addEvent,
      removeEvent: this.removeEvent,
      removeAllEvents: this.removeAllEvents
    }
  }

  addEvent = (el, name, fn) => {
    this.events.push([el, name, fn])
    el.addEventListener(name, fn)
  }

  removeEvent = (el, name, fn) => {
    el.removeEventListener(name, fn)

    for (let x = 0; x < this.events.length; x++) {
      const event = this.events[x]
      const [el_, name_, fn_] = event

      if (el === el_ && name === name_ && fn === fn_) {
        this.events.splice(x, 1)
      }
    }
  }

  removeAllEvents = el => {
    for (let x = 0; x < this.events.length; x++) {
      const [el_, name, fn] = this.events[x]
      if (!el || el_ === el) {
        el_.removeEventListener(name, fn)
        this.events.splice(x, 1)
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
