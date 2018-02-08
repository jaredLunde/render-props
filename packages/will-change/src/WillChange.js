import React from 'react'
import PropTypes from 'prop-types'
import Toggle from '@render-props/toggle'
import Events from '@render-props/events'
import toKebabCase from '@render-props/utils/es/toKebabCase'
import requestTimeout, {clearRequestTimeout} from '@render-props/utils/es/requestTimeout'
import callIfExists from '@render-props/utils/es/callIfExists'


/**
import WillChange from '@render-props/will-change'


const WillChangeButton = props => (
  <WillChange properties={['padding', 'font-size']} onHover>
    {({
      willChangeRef,
      willChange,
      style
    }) => (
      <button
        ref={willChangeRef}
        style={
          Object.assign(
            style,
            {
              transition: 'padding 0.16s ease-out, font-size 0.16s ease-out'
            }
          )
        }
      >
        Hovering? {JSON.stringify(props.isHovering)}
      </button>
    )}
  </WillChange>
)
*/


const defaultEventTypes = {
  onTouchStart: 'touchstart',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onMouseMove: 'mousemove',
  onClick: 'mousedown',
  onHover: 'mouseenter',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onScroll: 'scroll',
  onResize: 'resize',
  onFocus: 'focus',
  onBlur: 'blur',
  onDrag: 'dragstart',
  onDrop: 'drop',
}


// For a click to fire it must satisfy all provided conditions
export class WillChange extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    properties: PropTypes.array,
    eventTypes: PropTypes.array,
    // Properties
    all: PropTypes.bool,
    // Event types
    onTouchStart: PropTypes.bool,
    onTouchEnd: PropTypes.bool,
    onTouchMove: PropTypes.bool,
    onMouseMove: PropTypes.bool,
    onClick: PropTypes.bool,
    onHover: PropTypes.bool,
    onMouseEnter: PropTypes.bool,
    onMouseLeave: PropTypes.bool,
    onScroll: PropTypes.bool,
    onResize: PropTypes.bool,
    onFocus: PropTypes.bool,
    onBlur: PropTypes.bool,
    onDrag: PropTypes.bool,
    onDrop: PropTypes.bool,
    staleTimeout: PropTypes.number,
    // From Toggle
    on: PropTypes.func,
    off: PropTypes.func,
    value: PropTypes.bool,
    // From Events
    addEvent: PropTypes.func,
    removeEvent: PropTypes.func,
    removeAllEvents: PropTypes.func
  }

  static defaultProps = {
    staleTimeout: 1000
  }

  changeElements = []
  changeHints = []
  changeEvents = []
  staleTimeout = null
  started = false

  constructor (props) {
    super(props)
    this.setupHints(props)
  }

  componentDidUpdate (nextProps) {
    this.setupHints(nextProps)
  }

  componentWillUnmount () {
    this.clearStaleTimeout()
  }

  willChangeRef = e => {
    if (e !== null && this.changeElements.indexOf(e) === -1) {
      this.changeElements.push(e)

      const {addEvent} = this.props
      for (let x = 0; x < this.changeEvents.length; x++) {
        addEvent(e, this.changeEvents[x], this.on)
      }

      addEvent(e, 'animationstart', () => this.started = true)
      addEvent(e, 'transitionstart', () => this.started = true)
      addEvent(e, 'animationend', this.off)
      addEvent(e, 'transitionend', this.off)
    }
  }

  setupHints (props) {
    this.changeEvents = []
    this.changeHints = []

    for (let propName in props) {
      if (defaultEventTypes !== void 0) {
        this.changeEvents.push(defaultEventTypes[propName])
      }
    }

    if (this.props.eventTypes !== void 0) {
      for (let x = 0; x < this.props.eventTypes.length; x++) {
        this.changeEvents.push(this.props.eventTypes[x])
      }
    }

    for (let x = 0; x < this.props.properties.length; x++) {
      this.changeHints.push(toKebabCase(this.props.properties[x]))
    }

    if (this.changeHints.length === 0) {
      this.changeHints.push('all')
    }

    if (props.all) {
      this.changeHints = ['all']
    }
  }

  willChange = () => this.on(true)

  on = forceStart => {
    const {on, staleTimeout} = this.props
    const isOn = this.props.isOn
    if (isOn) return;

    on()

    if (forceStart) {
      this.started = true
    }

    if (staleTimeout) {
      this.staleTimeout = requestTimeout(() => this.off(true), staleTimeout)
    }
  }

  off = (stale = false) => {
    if (!stale || stale && this.started) {
      this.props.off()
      this.clearStaleTimeout()
      this.started = false
    }
  }

  clearStaleTimeout () {
    if (this.staleTimeout !== null) {
      clearRequestTimeout(this.staleTimeout)
      this.staleTimeout = null
    }
  }

  render () {
    /** willChangeRef, willChange, style */
    return this.props.children({
      style: (
        this.props.isOn === true
          ? ({willChange: this.changeHints.join(',')})
          : {}
      ),
      willChangeRef: this.willChangeRef,
      willChange: this.willChange
    })
  }
}


export default function (props) {
  return (
    <Events>
      {function (eventContext) {
        return (
          <Toggle initialValue={props.initialValue || false}>
            {function ({value, on, off}) {
              return <WillChange
                {...props}
                {...eventContext}
                on={on}
                off={off}
                isOn={value}
                children={props.children}
              />
            }}
          </Toggle>
        )
      }}
    </Events>
  )
}
