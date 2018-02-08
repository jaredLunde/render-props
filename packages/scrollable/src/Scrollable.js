import React from 'react'
import PropTypes from 'prop-types'
import Events from '@render-props/events'
import Throttle from '@render-props/throttle'
import callIfExists from '@render-props/utils/es/callIfExists'
import {scrollTo, getDistance, getDirection} from './utils'

/**
import Scrollable from '@render-props/scrollable'


const ScrollableBox = props => (
  <Scrollable>
    {
      ({
        scrollRef,
        scrollToX,
        scrollToY,
        scrollTo,
        scrollHeight,
        scrollWidth,
        scrollY,
        scrollX,
        clientHeight,
        clientWidth,
        max,
        direction,
        distance,
      }) => (
        <div
          ref={scrollRef}
          style={{
            width: 300,
            height: 300,
            overflow: 'auto',
            background: '#000'
          }}
        >
          <div style={{width: 600, height: 16000, position: 'relative'}}>
            <pre style={{
              position: 'absolute',
              top: scrollY + 10,
              left: scrollX + 10
            }}>
              {JSON.stringify({
                scrollRef,
                scrollToX,
                scrollToY,
                scrollTo,
                scrollHeight,
                scrollWidth,
                scrollY,
                scrollX,
                clientHeight,
                clientWidth,
                max,
                direction,
                distance,
              }, null, 2)}
            </pre>
          </div>
        </div>
      )
    }
  </Scrollable>
)
*/


const initialState = {
  scrollHeight: 0,
  scrollWidth: 0,
  scrollY: 0,
  scrollX: 0,
  clientHeight: 0,
  clientWidth: 0,
  max: {x: 0, y: 0},
  direction: {x: 0, y: 0},
  distance: {x: 0, y: 0}
}


export class Scrollable_ extends React.Component {
  static displayName = 'Scrollable'
  static propTypes = {
    children: PropTypes.func.isRequired,
    onScroll: PropTypes.func,
    initialX: PropTypes.number,
    initialY: PropTypes.number
  }

  scrollable = null

  constructor (props) {
    super(props)

    this.scrollableContext = {
      scrollRef: this.scrollRef,
      scrollToX: this.scrollToX,
      scrollToY: this.scrollToY,
      scrollTo: this.scrollTo
    }
  }

  componentDidMount () {
    const {initialX, initialY} = this.props

    if (initialX || initialY) {
      this.scrollTo(initialX, initialY)
    }
  }

  componentDidUpdate ({state}) {
    if (
      state.scrollX !== this.props.state.scrollX
      || state.scrollY !== this.props.state.scrollY
    ) {
      callIfExists(this.props.onScroll, this.props.state)
    }
  }

  scrollRef = e => {
    if (e === null) {
      return
    }

    const scrollableChanged = this.scrollable !== e
    if (this.scrollable !== e) {
      if (this.scrollable !== null) {
        this.props.removeAllEvents(this.scrollable)
      }

      this.scrollable = e
      this.props.addEvent(e, 'scroll', this.onScroll)
      this.onScroll()
    }
  }

  onScroll = e => {
    this.props.throttleState(
      prevState => {
        const {
          scrollWidth,
          scrollHeight,
          scrollLeft,
          scrollTop,
          clientWidth,
          clientHeight
        } = this.scrollable
        const nextScroll = {scrollX: scrollLeft, scrollY: scrollTop}
        const direction = getDirection(prevState, nextScroll)
        const distance = getDistance(prevState, nextScroll)

        return {
          scrollWidth: scrollWidth,
          scrollHeight: scrollHeight,
          scrollX: scrollLeft,
          scrollY: scrollTop,
          clientWidth,
          clientHeight,
          max: {
            x: scrollWidth - clientWidth,
            y: scrollHeight - clientHeight
          },
          direction,
          distance
        }
      }
    )
  }

  scrollTo = (posX, posY, opt) => {
    if (typeof opt !== 'object' && opt !== null) {
      if (posY !== void 0 && posX !== null) {
        this.scrollable.scrollTop = posY
      }

      if (posX !== void 0 && posY !== null) {
        this.scrollable.scrollLeft = posX
      }
    }
    else {
      scrollTo(
        this.scrollable,
        {x: this.props.state.scrollX, y: this.props.state.scrollY},
        {x: posX, y: posY},
        opt
      )
    }
  }

  scrollToX = (posX, opt) => this.scrollTo(posX, null, opt)
  scrollToY = (posY, opt) => this.scrollTo(null, posY, opt)

  render () {
    return this.props.children(Object.assign(this.scrollableContext, this.props.state))
  }
}


export default function Scrollable (props) {
  return (
    <Events>
      {function (eventContext) {
        return (
          <Throttle initialState={initialState}>
            {function (throttleContext) {
              return <Scrollable_ {...eventContext} {...throttleContext} {...props}/>
            }}
          </Throttle>
        )
      }}
    </Events>
  )
}
