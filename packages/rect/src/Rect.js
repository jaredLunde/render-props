import React from 'react'
import PropTypes from 'prop-types'
import Events from '@render-props/events'
import Throttle from '@render-props/throttle'
import {rect} from './utils'


/**
import Rect from '@render-props/rect'

<Rect>
  ({rectRef, recalcRect, top, right, bottom, left, width, height}) => (
    <div ref={rectRef}>
      <div>
        My width: {width}
      </div>
      <div>
        My height: {height}
      </div>
      <div>
        My pos: {JSON.stringify({top, right, bottom, left})}
      </div>
    </div>
  )
</Rect>
*/
class Rect_ extends React.Component {
  static displayName = 'Rect'
  static propTypes = {
    children: PropTypes.func.isRequired,
    recalcOnWindowResize: PropTypes.bool,
    withCoords: PropTypes.bool
  }

  static defaultProps = {
    recalcOnWindowResize: true,
    withCoords: true,
  }

  element = null

  constructor (props) {
    super(props)
    this.rectContext = {
      rectRef: this.rectRef,
      recalcRect: this.recalcRect
    }
  }

  componentDidMount () {
    if (this.props.recalcOnWindowResize && typeof window !== 'undefined') {
      this.props.addEvent(window, 'resize', this.recalcRect)
      this.props.addEvent(window, 'orientationchange', this.recalcRect)
    }
  }

  rectRef = el => {
    if (el !== null && el !== this.element) {
      this.element = el
      this.recalcRect()
    }
  }

  recalcRect = () => this.props.throttleState(rect(this.element))
  getRect = () => this.props.state

  render () {
    const props = this.rectContext

    if (this.props.withCoords === true) {
      props.top = this.props.state.top
      props.right = this.props.state.right
      props.bottom = this.props.state.bottom
      props.left = this.props.state.left
      props.width = this.props.state.width
      props.height = this.props.state.height
    }
    else {
      props.getRect = this.getRect
    }

    return this.props.children(props)
  }
}


export default function Rect (props) {
  return (
    <Events>
      {function (eventsContext) {
        return (
          <Throttle>
            {function (throttleContext) {
              return React.createElement(
                Rect_,
                Object.assign({}, eventsContext, throttleContext, props)
              )
            }}
          </Throttle>
        )
      }}
    </Events>
  )
}
