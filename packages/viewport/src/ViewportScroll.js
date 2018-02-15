import React from 'react'
import PropTypes from 'prop-types'
import Events from '@render-props/events'
import throttle from '@render-props/throttle/es/utils/throttle'
import {getDistance, getDirection, scrollTo} from '@render-props/scrollable/es/utils'
import {win} from './statics'
import {viewportQueriesContext} from './ViewportQueries'


/**
<ViewportScroll withCoords={true}>
  {
    ({scrollX, scrollY, scrollTo}) => (
      <Row>
        <Col x={4}>scrollX: {scrollX}</Col>
        <Col x={4}>scrollY: {scrollY}</Col>
        <Col x={8}>
          scrollTo
          <input
            type='number'
            min={0}
            value={scrollY}
            onChange={e => scrollTo(0, e.target.value)}
          />
        </Col>
      </Row>
    )
  }
</ViewportScroll>
**/


function getScroll () {
  return {
    scrollX: win.scrollX !== void 0 ? win.scrollX : win.pageXOffset,
    scrollY: win.scrollY !== void 0 ? win.scrollY : win.pageYOffset
  }
}


export class ViewportScroll_ extends React.Component {
  static displayName = 'ViewportScroll'
  static propTypes = {
    children: PropTypes.func.isRequired,
    withCoords: PropTypes.bool
  }

  static defaultProps = {
    withCoords: true
  }

  constructor (props) {
    super(props)
    props.addEvent(win, 'scroll', this.setScroll)
    this.viewportScrollContext = {
      scrollTo: function (x, y, opt) {
        if (typeof opt !== 'object') {
          win.scrollTo(x, y)
        }
        else {
          const currentPos = getScroll()

          scrollTo(
            win,
            {x: currentPos.scrollX, y: currentPos.scrollY},
            {x, y},
            opt
          )
        }
      }
    }
    this.prevState = {}
  }

  componentWillUnmount () {
    this.setScroll.cancel()
  }

  setScroll = throttle(() => this.forceUpdate())

  render () {
    const scroll = getScroll()
    const prevState = this.prevState

    if (this.props.withCoords === true) {
      this.viewportScrollContext.scrollX = scroll.scrollX
      this.viewportScrollContext.scrollY = scroll.scrollY
      const distance = getDistance(prevState, scroll)
      const direction = getDirection(prevState, scroll)
      this.viewportScrollContext.distance = distance
      this.viewportScrollContext.direction = direction
      scroll.distance = distance
      scroll.direction = direction
    }
    else {
      this.viewportScrollContext.getScroll = getScroll
      this.viewportScrollContext.getDistance = () => getDistance(prevState, scroll)
      this.viewportScrollContext.getDirection = () => getDirection(prevState, scroll)
    }
    this.prevState = scroll

    return this.props.children(this.viewportScrollContext)
  }
}


export default function ViewportScroll (props) {
  return (
    <Events>
      {function (eventsContext) {
        return <ViewportScroll_
          {...eventsContext}
          withCoords={props.withCoords}
          children={props.children}
        />
      }}
    </Events>
  )
}
