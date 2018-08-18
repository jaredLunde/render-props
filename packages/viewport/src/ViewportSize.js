import React from 'react'
import PropTypes from 'prop-types'
import Events from '@render-props/events'
import {throttle} from '@render-props/throttle'
import {getSize, getAspect} from './utils'
import {win} from './statics'


/**
<ViewportSize>
  {
    ({width, height}) => (
      <Row>
        <Col x={8}>viewport width: {width}</Col>
        <Col x={8}>viewport height: {height}</Col>
      </Row>
    )
  }
</ViewportSize>
**/



export class ViewportSize_ extends React.Component {
  static displayName = 'ViewportSize'

  static propTypes = {
    children: PropTypes.func.isRequired,
    withCoords: PropTypes.bool
  }

  static defaultProps = {
    withCoords: true
  }

  componentDidMount () {
    this.props.addEvent(win, 'resize', this.setSize)
    this.props.addEvent(win, 'orientationchange', this.setSize)
  }

  componentWillUnmount () {
    this.setSize.cancel()
  }

  setSize = throttle(() => this.forceUpdate())

  render () {
    let props

    if (this.props.withCoords) {
      props = getSize()
      props.aspect = getAspect(win)
    }
    else {
      props = {getAspect, getSize}
    }

    return this.props.children(props)
  }
}


export default function ViewportSize (props) {
  return (
    <Events>
      {function (eventsContext) {
        return <ViewportSize_
          {...eventsContext}
          withCoords={props.withCoords}
          children={props.children}
        />
      }}
    </Events>
  )
}
