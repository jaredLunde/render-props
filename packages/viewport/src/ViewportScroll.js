import React from 'react'
import PropTypes from 'prop-types'
import Events from '@render-props/events'
import throttle from '@render-props/throttle/es/utils/throttle'
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


export class ViewportScroll extends React.Component {
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
      scrollTo: win.scrollTo
    }
  }

  componentWillUnmount () {
    this.setScroll.cancel()
  }

  setScroll = throttle(() => this.forceUpdate())

  render () {
    if (this.props.withCoords === true) {
      const scroll = getScroll()
      this.viewportScrollContext.scrollX = scroll.scrollX
      this.viewportScrollContext.scrollY = scroll.scrollY
    }
    else {
      this.viewportScrollContext.getScroll = getScroll
    }

    return this.props.children(this.viewportScrollContext)
  }
}


export default function ({withCoords, children}) {
  return (
    <Events>
      {function (eventsContext) {
        return <ViewportScroll
          {...eventsContext}
          withCoords={withCoords}
          children={children}
        />
      }}
    </Events>
  )
}
