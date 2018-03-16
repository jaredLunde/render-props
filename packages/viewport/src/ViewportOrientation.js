import React from 'react'
import PropTypes from 'prop-types'
import {getOrientation} from './utils'
import {win, winScreen} from './statics'
import ViewportSize from './ViewportSize'


/**
<ViewportOrientation>
  {
    ({width, height, aspect, orientation, screenOrientation}) => (
      <Row
        bg='translucentWhite'
        br='1'
        p='3'
        m='t3'
        bc='translucentLight'
      >
        <Col x={4}>viewport width: {width}</Col>
        <Col x={4}>viewport height: {height}</Col>
        <Col x={4}>orientation: {orientation}</Col>
        <Col x={4}>screen orientation: {screenOrientation}</Col>
      </Row>
    )
  }
</ViewportOrientation>
**/
export const supportsScreenOrientation = (
  winScreen &&
  winScreen.orientation &&
  winScreen.orientation.type
)


export default function ViewportOrientation (props) {
  // should be safely mutable because there aren't variable state keys
  // and we are localizing it to this component
  function children (sizeContext) {
    sizeContext.orientation = getOrientation(sizeContext)
    sizeContext.screenOrientation = (
      supportsScreenOrientation
      ? winScreen.orientation.type
      : null
    )

    return props.children(sizeContext)
  }

  return ViewportSize({withCoords: props.withCoords, children})
}


ViewportOrientation.propTypes = {
  children: PropTypes.func.isRequired
}
