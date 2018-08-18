import React from 'react'
import PropTypes from 'prop-types'
import Events from '@render-props/events'
import {canHover} from '@render-props/hover'
import Throttle from '@render-props/throttle'
import {requestTimeout, clearRequestTimeout, callIfExists} from '@render-props/utils'


/**
import MousePosition from '@render-props/mouse-position'


const MousePositionDiv = props => (
  <MousePosition enterDelay={500} leaveDelay={200}>
    {
      ({
        mouseRef,
        canMove,
        pageX,
        pageY,
        clientX,
        clientY,
        screenX,
        screenY,
        elementX,
        elementY,
      }) => (
        <div ref={mouseRef}>
          Is over?: {isOver}
          Element position X: {elementX}
          Element position Y: {elementY}
        </div>
      )
    }
  </MousePosition>
)
*/


const initialState = {
  pageX: null,
  pageY: null,
  clientX: null,
  clientY: null,
  screenX: null,
  screenY: null,
  elementX: null,
  elementY: null,
  elementWidth: null,
  elementHeight: null,
  isOver: false
}


export class MousePosition_ extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    enterDelay: PropTypes.number,
    leaveDelay: PropTypes.number,
    onMove: PropTypes.func,
    onLeave: PropTypes.func
  }

  element = null
  timeout = null
  entered = false

  constructor (props) {
    super(props)
    this.mousePositionContext = {mouseRef: this.mouseRef, canMove: canHover}
  }

  mouseRef = e => {
    if (canHover === false || this.element === e) {
      return
    }

    if (this.element !== null) {
      this.props.removeAllEvents(this.element)
    }

    if (e !== null) {
      this.element = e
      this.addListeners(this.element)
    }
  }

  addListeners (e) {
    this.props.addEvent(e, 'mouseenter', this.delay(this.onEnter, this.props.enterDelay))
    this.props.addEvent(e, 'mousemove', this.onMove)
    this.props.addEvent(e, 'mouseleave', this.delay(this.onLeave, this.props.leaveDelay))
  }

  delay = (onOrOff, delay) => {
    return e => {
      if (!canHover) {
        return
      }

      if (this.timeout) {
        clearRequestTimeout(this.timeout)
      }

      if (delay) {
        this.timeout = requestTimeout(() => onOrOff(e), delay)
      } else {
        onOrOff(e)
      }
    }
  }

  onMove = e => {
    if (canHover === false || this.entered === false) return;

    this.props.throttleState(
      () => {
        const {clientX, clientY, screenX, screenY, pageX, pageY} = e
        const elementX = pageX - this.element.offsetLeft
        const elementY = pageY - this.element.offsetTop

        return {
          pageX,
          pageY,
          clientX,
          clientY,
          screenX,
          screenY,
          elementX,
          elementY,
          elementWidth: this.element.offsetWidth,
          elementHeight: this.element.offsetHeight,
          isOver: true
        }
      },
      () => callIfExists(this.props.onMove, this.props.state, e)
    )
  }

  onEnter = e => {
    this.entered = true
    this.onMove(e)
  }

  onLeave = e => {
    if (canHover === false) return;

    this.entered = false
    this.props.throttleState(initialState, () => callIfExists(this.props.onLeave, e))
  }

  componentWillUnmount () {
    if (this.timeout) {
      clearRequestTimeout(this.timeout)
    }
  }

  render () {
    return this.props.children({...this.mousePositionContext, ...this.props.state})
  }
}


export default function MousePosition (props) {
  return (
    <Events>
      {function (eventContext) {
        return (
          <Throttle initialState={initialState}>
            {function (throttleContext) {
              return <MousePosition_ {...throttleContext} {...eventContext} {...props}/>
            }}
          </Throttle>
        )
      }}
    </Events>
  )
}
