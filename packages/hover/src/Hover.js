import React from 'react'
import PropTypes from 'prop-types'
import Toggle from '@render-props/toggle'
import Events from '@render-props/events'
import {requestTimeout, clearRequestTimeout} from '@render-props/utils'


/**
import Hover from '@render-props/hover'

const HoverableButton = props => (
  <Hover enterDelay={500} leaveDelay={200}>
    {
      ({isHovering, canhover, hoverRef}) => (
        <button ref={hoverRef}>
          Hovering? {JSON.stringify(isHovering)}
        </button>
      )
    }
  </Hover>
)
*/


export const canHover =
  typeof window !== 'undefined'
  ? !(window.matchMedia('(hover: none)').matches)
  : false


class Hover_ extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    enterDelay: PropTypes.number,
    leaveDelay: PropTypes.number,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.hoverContext = {
      canHover,
      hoverRef: this.hoverRef,
      isHovering: props.value,
    }

    this.element = null
    this.timeout = null
  }

  componentWillUnmount () {
    if (this.timeout) {
      clearRequestTimeout(this.timeout)
    }
  }

  control (onOrOff, delay) {
    if (!canHover) {
      return
    }

    if (this.timeout) {
      clearRequestTimeout(this.timeout)
    }

    if (delay) {
      this.timeout = requestTimeout(onOrOff, delay)
    } else {
      onOrOff()
    }
  }

  hoverRef = e => {
    if (this.element !== null) {
      this.props.removeAllEvents()
    }

    if (e !== null) {
      this.element = e
      this.props.addEvent(this.element, 'mouseenter', this.onEnter)
      this.props.addEvent(this.element, 'mouseleave', this.onLeave)
    }
  }

  onEnter = () => {
    const {on, enterDelay} = this.props
    this.control(on, enterDelay)
  }

  onLeave = () => {
    const {off, leaveDelay} = this.props
    this.control(off, leaveDelay)
  }

  render () {
    this.hoverContext.isHovering = this.props.value
    return this.props.children(this.hoverContext)
  }
}


export default function Hover (props) {
  return (
    <Events>
      {function (eventContext) {
        return (
          <Toggle initialValue={props.initialValue || false}>
            {function (toggleContext) {
              return <Hover_
                {...eventContext}
                {...toggleContext}
                {...props}
              />
            }}
          </Toggle>
        )
      }}
    </Events>
  )
}
