import React from 'react'
import PropTypes from 'prop-types'
import Events from '@render-props/events'
import {callIfExists} from '@render-props/utils'


/**
const ClickButton = props => (
  <Click double left>
    {
      ({
        clickRef,
        numClicks,
        screenX,
        screenY,
        clientX,
        clientY,
        elementX,
        elementY
      }) => (
        <button ref={clickRef} className='btn btn--m btn--grey'>
          Clicked: {numClicks} times at
          <br/>
          {`{clientX: ${clientX}, clientY: ${clientY}}`}
          <br/>
          {`{screenX: ${screenX}, screenY: ${screenY}}`}
          <br/>
          {`{elementX: ${elementX}, elementY: ${elementY}}`}
        </button>
      )
    }
  </Click>
)
*/


function isClickOfType (e, types) {
  for (let x = 0; x < types.length; x++) {
    const type = types[x]
    const ors = type.split('|')

    if (ors.length > 1) {
      let orSatisfied = true

      for (let y = 0; y < ors.length; y++) {
        const or = ors[y]

        if (isClickOfType(e, [or]) === true) {
          orSatisfied = true
          break
        } else {
          orSatisfied = false
        }
      }

      if (orSatisfied === false) {
        return false
      }
    } else {
      const props = type.split('+')

      for (let y = 0; y < props.length; y++) {
        const [propName, propValue] = props[y].split('=')

        if (propValue !== void 0) {
          if (String(e[propName]) !== String(propValue)) {
            return false
          }
        } else if (e[propName] === false) {
          return false
        }
      }
    }
  }

  return true
}


export const CLICK_TYPES = {
  single: 'detail=1',
  double: 'detail=2',
  triple: 'detail=3',
  left: 'button=0',
  middle: 'button=1',
  right: 'button=2',
  shift: 'shiftKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  alt: 'altKey',
  altMeta: 'metaKey+altKey',
  altShift: 'altKey+shiftKey',
  controlAlt: 'ctrlKey+altKey',
  controlShift: 'ctrlKey+shiftKey',
  controlMeta: 'ctrlKey+metaKey',
  metaShift: 'metaKey+shiftKey',
  controlOrMeta: 'metaKey|ctrlKey'
}


// For a click to fire it must satisfy all provided conditions
class Click_ extends React.Component {
  static displayName = 'Click'
  static propTypes = {
    children: PropTypes.func.isRequired,
    clickTypes: PropTypes.array,
    // Click Types
    single: PropTypes.bool,
    double: PropTypes.bool,
    triple: PropTypes.bool,
    left: PropTypes.bool,
    middle: PropTypes.bool,
    right: PropTypes.bool,
    shift: PropTypes.bool,
    control: PropTypes.bool,
    meta: PropTypes.bool,
    alt: PropTypes.bool,
    altMeta: PropTypes.bool,
    altShift: PropTypes.bool,
    controlAlt: PropTypes.bool,
    controlShift: PropTypes.bool,
    controlMeta: PropTypes.bool,
    metaShift: PropTypes.bool,
    controlOrMeta: PropTypes.bool,
    onClick: PropTypes.func,
    preventDefault: PropTypes.bool
  }

  state = {
    numClicks: null,
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    elementX: null,
    elementY: null,
    rectX: null,
    rectY: null
  }

  element = null
  types = []

  componentDidMount () {
    this.setupClickTypes()
  }

  componentDidUpdate () {
    this.setupClickTypes()
  }

  setupClickTypes () {
    this.types = []
    const {clickTypes} = this.props

    if (clickTypes) {
      for (let x = 0; x < clickTypes.length; x++) {
        this.types.push(clickTypes[x])
      }
    }

    const propKeys = Object.keys(this.props)
    for (let x = 0; x < propKeys.length; x++) {
      const propName = propKeys[x]
      const clickType = CLICK_TYPES[propName]

      if (clickType !== void 0 && this.props[propName] === true) {
        this.types.push(clickType)
      }
    }
  }

  clickRef = el => {
    const clickChanged = this.element !== el

    if (this.element !== null && clickChanged) {
      this.props.removeAllEvents(this.element)
    }

    if (clickChanged) {
      this.element = el

      if (this.element !== null) {
        this.props.addEvent(this.element, 'click', this.onClick)
      }
    }
  }

  onClick = e => {
    if (isClickOfType(e, this.types) === false) {
      return
    }

    const {onClick, preventDefault} = this.props
    const {left, top} = this.element.getBoundingClientRect()
    const rectX = Math.floor(left)
    const rectY = Math.floor(top)

    if (preventDefault) {
      e.preventDefault()
    }

    this.setState(
      {
        numClicks: e.detail,
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        elementX: e.clientX - rectX,
        elementY: e.clientY - rectY,
        rectX,
        rectY
      },
      () => callIfExists(this.props.onClick, this.state, e)
    )
  }

  render () {
    return this.props.children({clickRef: this.clickRef, ...this.state})
  }
}


export default function Click (props) {
  return (
    <Events>
      {function (eProps) {
        return React.createElement(Click_, Object.assign({}, eProps, props))
      }}
    </Events>
  )
}
